const discogsKeys = require('./discogs-keys');
const Discogs = require('disconnect').Client;

const dis = {
  consumerKey: discogsKeys.CONSUMER_KEY,
  consumerSecret: discogsKeys.CONSUMER_SECRET,
  userToken: discogsKeys.USER_TOKEN,
  userAgent: 'RYMListEnhancer 1.0 +https://localhost:3000'
}

// const disSearch = new Discogs('RYMListEnhancer 1.0', {userToken: discogsKeys.USER_TOKEN});

const db = new Discogs(dis).database();

// db.getMaster("618856", (err, data) => {
//   console.log(data);
// })
db.search("The Complete Aladdin Recordings Of Lester Young", "title", (err, data) => {
  console.log(data);
});
// 