var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


const scraper = require('../scraper');

router.route('/')
  .get((req, res) => {
    res.render('index');
  })
  .post((req, res) => {
    var linkInput = req.body.listlink
    scraper(linkInput)
      .then(result => {
        res.render('preview-scrape-results', {
          listAuthor: result.author,
          listTitle: result.listTitle,
          listRecords: result.records
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