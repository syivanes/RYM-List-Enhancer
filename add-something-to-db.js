const Sequelize = require('sequelize');
const sequelize = require('./db');
const Record = require('./models/record');
const RecordList = require('./models/record-list');
const testList = RecordList.findById(1);
const testRecord = Record.findById(1);

sequelize.sync()
    .then(() => {
      return testList.addRecord(testRecord)
    })