const scrapeIt = require('scrape-it');


const scraper = (url) => {
  return scrapeIt(url, {
    author: ".lnk",
    listTitle: "title",
    records: {
      listItem: "tr",
      data: {
        artistName: ".list_artist",
        recordTitle: ".list_album",
        rymId: {
          selector: '.list_album', 
          attr: 'title'
        },
        releaseYear: ".rel_date"
      }
    
    }
  }).then(({ data, response }) => {
      // return filterOutBlanks(data)
      data.author = formatAuthor(data.author)
      data.records = filterOutBlankRecords(data.records)
      return data
    })
    .then(filteredData => {
      filteredData.records = formatRecordsData(filteredData.records)
      // return filteredData.records;
      return filteredData;
    })
}

scraper('http://localhost:3000/bandcamp-death-metal')

const filterOutBlankRecords = (records) => {
  return records.filter(record => record.rymId.length > 0)
}

const paramFormatter = (param, pattern) => {
  const match = param.match(pattern);
  return match[0];
}

const formatRymId = (rymId) => {
  if (rymId) {
    return paramFormatter(rymId, /\w+\d+/g);
  } else {
    return '';
  }
}

const formatListTitle = (listTitle) => {
  if (listTitle) {
    return paramFormatter(listTitle, /^(.*?)\./)
  } else {
    return '';
  }
}

const formatReleaseYear = (releaseYear) => {
  if (releaseYear) { 
    return paramFormatter(releaseYear, /\d{4}/g);
  } else {
    return '';
  }
}

const formatAuthor = (author) => {
  if (author) {
    return paramFormatter(author, /[^\s]+/g);
  }
}

const formatRecordsData = (records) => {
  records.map((record) => {
    record.rymId = formatRymId(record.rymId)
    record.releaseYear = formatReleaseYear(record.releaseYear)
    return record;
  })
  return records
}

module.exports = scraper;