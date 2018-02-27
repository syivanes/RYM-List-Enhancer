const Record = require('./models/record');
const RecordList = require('./models/record-list');

RecordList.sync({force: true})
  .then(() => {
    return Record.sync({force: true})
  })