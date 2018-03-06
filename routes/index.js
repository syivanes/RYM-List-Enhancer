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
    var linkInput = req.body.listlink
    scraper(linkInput)
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
            res.render('view-list', {
              listAuthor: result.rymUser,
              listTitle: result.title,
              listRecords: records
            })
          })
        

      })
  })


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