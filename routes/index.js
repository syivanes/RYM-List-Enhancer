const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const Record = require('../models/record');
const RecordList = require('../models/record-list');

const redis = require('redis');
const redisClient = redis.createClient();

const scraper = require('../scraper');

const discogs = require('../discogs');

router.route('/')
  .get((req, res) => {
    RecordList.findAll()
      .then(allLists => {
        const lists = allLists.map(list => {
          return {
            listTitle: list.title,
            listAuthor: list.rymUser,
            id: list.id
          }
        })
        return lists;
      })
      .then(lists => {
        res.render('index', {
          lists: lists
        });
      })
    })

  .post((req, res, next) => {
    // console.log(req.body.pagesource)
    redisClient.set('pageSource', req.body.pagesource)
    // .then(() => {
      scraper('http://localhost:3000/temp-page-source')
      .then(result => {

        redisClient.set('scrapeResults', JSON.stringify(result));
        redisClient.get('scrapeResults', (err, data) => {
          data = (JSON.parse(data))
          res.render('preview-scrape-results', {
            listAuthor: data.author,
            listTitle: data.listTitle,
            listRecords: data.records
          })
        })
      })
    // })
    
  })

router.route('/save-scrape-results')
  .post((req, res) => {
    redisClient.get('scrapeResults', (err, data) => {
      parsedRedisData = JSON.parse(data);

      RecordList.create({
        rymUser: parsedRedisData.author,
        title: parsedRedisData.listTitle
      }).then(createdList => {
        parsedRedisData.records.map((record) => {
          Record.create({
            artistName: record.artistName,
            recordTitle: record.recordTitle,
            rymId: record.rymId,
            releaseYear: record.releaseYear
          }).then(record => {
            record.addRecordList(createdList);
          }).then(() => {
            res.redirect('/')
            // sendListDataToView({ params: {id: createdList.id} }, res, 'view-list')

          })
        })
      })
    })
  })

router.route('/list/:id')
  .get((req, res) => {
    sendListDataToView(req, res, 'view-list')
  })

router.route('/expand-list-records/:id')
  .get((req, res) => {
    sendListDataToView(req, res, 'edit-list-records')
  })
  
router.route('/process-all-list-forms/:listId')
  .post((req, res) => {
    console.log(req.body)
  })

router.route('/expand-list-records-save/:listId/:recordId')
  .post((req, res) => {
      // console.log(req)
      Record.findOne({
        where: {
          id: req.params.recordId
        }
      }).then(result => {
          if ((result.embeddedMedia !== req.body.embeddedmedia) || 
              (result.discogsId !== req.body.discogsid)) {
                result.update({
                  embeddedMedia: req.body.embeddedmedia,
                  discogsId: req.body.discogsid
                })
                console.log(`updating ${result.recordTitle}`)
          } else {
            console.log(`nothing to update for ${result.recordTitle}, skipping`)
            res.end()
          }
          res.end()
        })
      // .then(() => {
      //     console.log("sending list to view")
      //     sendListDataToView({ params: {id: req.params.listId} }, res, 'view-list')

      //   })
    })

router.route('/discogs-page/:discogsId')
  .get((req, res) => {
    return discogs.getReleaseUrl(req.params.discogsId)
    .then(result => { res.redirect(result) })
  })
  

router.route('/temp-page-source')
  .get((req, res) => {
    redisClient.get('pageSource', (err, data) => {
      res.render('temp-page-source', {
        pageSource: data
      })
    })
  })


const sendListDataToView = (req, res, view) => {
  console.log("finding record list")
  RecordList.findOne({
    where: {
      id: req.params.id
    }
  }).then(result => {
      console.log("findting record relations")
      return Record.findAll({
        include: {
          model: RecordList,
          where: {id: result.id}
        }
      }).then(records => {
          console.log("rendering")
          res.setHeader('X-XSS-Protection', '0');
          res.render(view, {
            listAuthor: result.rymUser,
            listTitle: result.title,
            listRecords: records,
            listId: req.params.id
          })
        })
    })
  }


router.get('/favorite-jazz', (req, res, next) => {
  res.render('test_lists/favorite-jazz');
});

router.get('/late-70s', (req, res, next) => {
  res.render('test_lists/late-70s');
});

router.get('/bandcamp-death-metal', (req, res, next) => {
  res.render('test_lists/bandcamp-death-metal');
})

module.exports = router;