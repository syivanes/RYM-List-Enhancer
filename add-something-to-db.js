const Sequelize = require('sequelize');
const sequelize = require('./db');
const Record = require('./models/record');
const RecordList = require('./models/record-list');
function addToTestList(rec) {
  RecordList.findById(1)
    .then((list) => {
      rec.addRecordList(list)
    })
  }





// sequelize.sync()
//     .then(() => {
//       return Record.findById(1)
//     })
//     .then((testRecord) => {
//       return addToTestList(testRecord)
//     })