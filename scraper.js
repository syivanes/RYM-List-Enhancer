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
      console.log(filteredData);
      return filteredData;
    })
}

// scraper('http://localhost:3000/bandcamp-death-metal')

const filterOutBlankRecords = (records) => {
  return records.filter(record => record.rymId.length > 0)
}

const paramFormatter = (param, pattern) => {
  const match = param.match(pattern);
  if ((match) && (match.length > 0)) {
    return match[0]
  } else {
    return ''
  }
}

const formatRymId = (rymId) => {
  return paramFormatter(rymId, /\w+\d+/g);
}

const formatListTitle = (listTitle) => {
  return paramFormatter(listTitle, /^(.*?)\./)
}

const formatReleaseYear = (releaseYear) => {
  return paramFormatter(releaseYear, /\d{4}/g);
}

const formatAuthor = (author) => {
  return paramFormatter(author, /[^\s]+/g);
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