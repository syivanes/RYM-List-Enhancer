const discogsKeys = require('./discogs-keys');
const Discogs = require('disconnect').Client;

const util = require('util');

const dis = {
  consumerKey: discogsKeys.CONSUMER_KEY,
  consumerSecret: discogsKeys.CONSUMER_SECRET,
  userToken: discogsKeys.USER_TOKEN,
  userAgent: 'RYMListEnhancer 1.0 +https://localhost:3000'
}

// const disSearch = new Discogs('RYMListEnhancer 1.0', {userToken: discogsKeys.USER_TOKEN});

const db = new Discogs(dis).database();

const resolveGetCall = (apiGetCall) => {
  var urlData = {};
  return Promise.resolve(apiGetCall)
  .then(result => { 
    if (result.images) { 
      urlData['releasePageUrl'] = result.uri;
      urlData['imageUrl'] = result.images[0].uri150;
      return urlData
    } else {
      urlData['releasePageUrl'] = result.uri;
      return urlData;
    }
  })
}

module.exports.getReleaseUrls = (discogsId) => {
  if (discogsId.startsWith('r')) {
    var apiGetCall = () => { return db.getRelease(discogsId.substring(1))}
    return resolveGetCall(apiGetCall())
  } else if (discogsId.startsWith('m')) {
    var apiGetCall = () => { return db.getMaster(discogsId.substring(1)) }
    return resolveGetCall(apiGetCall())
  }
}
