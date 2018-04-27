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

module.exports.getReleaseUrls = (discogsId) => {
  console.log(discogsId)
  var urlData = {};
  var apiGetCall = () => { return db.getRelease(discogsId.substring(1)) }
  return Promise.resolve(apiGetCall())
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



// const getReleaseUrl = (discogsId) => { 
//   return db.getRelease(discogsId)
//   // .then((data) => {
//   //   return data
//   // })
//   // .then((data) => {
//   //   return data.uri
//   // })   
// }

module.exports.getReleaseUrl = (discogsId) => {
  if (discogsId.startsWith('r')) {
    var apiGetCall = () => { return db.getRelease(discogsId.substring(1)) }
    return Promise.resolve(apiGetCall())
    .then((releaseData) => {
      return releaseData.uri
    })
  } else if (discogsId.startsWith('m')) {
    var apiGetCall = () => { return db.getMaster(discogsId.substring(1)) }
    return Promise.resolve(apiGetCall())
    .then((releaseData) => {
      return releaseData.uri
    }) 
  }
}

// console.log(getReleaseUrl('53130'))
// console.log(promise1('53130'))


// promise1('53130').then((data) => {
//   console.log(data.uri)
// })

// const getReleaseUrl = (discogsId, callback) => {
//   db.getRelease(discogsId, callback)
// }

// console.log(getReleaseUrl('53130', (err, data) => {
//   return data.uri
// }))
// console.log(getReleaseUrl("53130"));
//   if (discogsId.startsWith('r')) {
//     return db.getRelease(discogsId.substring(1), (err, data) => {
//       data.uri;
//     })
//   } 
//   // else if (discogsId.startsWith('m')) {
//   //   db.getMaster(discogsId.substring(1), (err, data) => {
//   //     return data
//   //   })
//   // } 
//   else {
//     return false;
//   }
// }

// var discogsId = "r53130";
// var discogsUrl = "";
// const getRelease = (discogsId, callback) => { 
//   db.getRelease(discogsId.substring(1), (err, data) => {
//     discogsUrl = data.uri
//     callback()
//   })
// }
// const returnUrl = () => { console.log(discogsUrl) }

// getRelease(discogsId, returnUrl)
// // var discogsId = "m206756";
// const whatever = (discogsId) => { 
//   getRelease(discogsId)
//   .then(data => {
//     console.log(data)
//   })
// }

// console.log(whatever("r53130"))
// db.search("The Complete Aladdin Recordings Of Lester Young", "title", (err, data) => {
//   console.log(data);
// });
// 