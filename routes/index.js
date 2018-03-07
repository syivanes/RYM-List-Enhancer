const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const Record = require('../models/record');
const RecordList = require('../models/record-list');

const redis = require('redis');
const redisClient = redis.createClient();

const scraper = require('../scraper');

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
  

router.route('/expand-list-records-save/:recordId')
  .post((req, res) => {
      // console.log(req.body)
      Record.findOne({
        where: {
          id: req.params.recordId
        }
      }).then(result => {
        console.log(req.body)
        result.update({
          embeddedMedia: req.body.embeddedmedia
        })
        // sendListDataToView({ id: req.params.id}, res, 'view-list')


        })
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
  RecordList.findOne({
    where: {
      id: req.params.id
    }
  }).then(result => {
      Record.findAll({
        include: {
          model: RecordList,
          where: {id: result.id}
        }
      }).then(records => {
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