const scrapeIt = require('scrape-it');


const scraper = (url) => {
  return scrapeIt(url, {
    author: ".user",
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
    // console.log(`STATUS CODE: ${response.statusCode}`)
    return data;
  })
};

module.exports = scraper;