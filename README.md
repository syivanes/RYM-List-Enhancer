**WHY**

As a longtime fan and collector of music, I've used RateYourMusic.com (aka RYM) for music recommendation lists produced by the site's thriving community. However, RYM does not offer enough options for media integration (i.e. posting playable media players for easier previewing of each music release), not does it try to form a union with Discogs.com - an online music database that is much more comprehensive with music release details (very important information for music collectors and sellers), yet doesn't have as rich of a recommendation list culture as RYM does. With this project, I wanted to get an idea of what merging data from RYM and Discogs, along with embedded media from streaming services, would look like. 



**How it works**

Watch the demo here https://youtu.be/wDzafJ1z6f0

RYM-List-Enhancer makes it possible to add more interactivity to music album recommendation lists from RateYourMusic.com (aka RYM). Because RYM does not offer an API, nor does it allow to run scripts on their pages, the user needs to copy the RYM list page’s entire source HTML, then paste and submit it through a form located on our app’s home page. 
The app then takes the HTML source input and stores it into a Redis key. After this, the data gets hosted on a temporary page inside the app. 
The url to this temporary page gets passed into a scraper method, which implements the Scrape-It library. 
Results from scraper operation then get formatted and stored inside another Redis key in order to render a preview of the result, which will finally store into Postgres database upon user’s “Approval” button click. 
Once the successfully scraped RYM list gets stored in the main db, the user can peruse it and add iframe embed code for media related to each individual music release item (i.e. media players from such streaming services as YouTube, SoundCloud, Bandcamp and others), along with the release's corresponding ID on the Discogs Music Database.
Our app integrates the Discogs API. Once the user submits the Discogs ID for a given music release, the app uses this ID to retrive URL for the release page on Discogs and the album cover art.



**Technologies used**

- Node.js with Express.js, and Promises, plenty of Promises
- HTML5/CSS3
- Handlebars.js
- [Scrape-It library](https://github.com/IonicaBizau/scrape-it)
- PostgreSQL with Sequelize
- Redis 
- [Discogs API](https://www.discogs.com/developers/) via [Disconnect, the Node.js client for the API](https://github.com/bartve/disconnect)


**Plans for near future**
- Oath integration, which will allow users browsing through lists to save indivitual entries to revisit later
- Definitely some refactoring
