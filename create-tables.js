const Record = require('./models/record');
const RecordList = require('./models/record-list');
// const RecordListRecord = require('./models/record-list-record');

RecordList.sync({force: true})
  .then(() => {
    return Record.sync({force: true})
  })
  // .then(() => {
  //   return RecordListRecord.sync({force: true})
  // })