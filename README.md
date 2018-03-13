RYM-List-Enhancermakes it possible to add more interactivity to music album recommendation lists from RateYourMusic.com (aka RYM). Because RYM does not offer API, nor does it allow to run scripts on their pages. 
The user needs to copy the list page’s entire source HTML, then paste and submit it through a form located on our app’s home page. 
The app then takes the HTML source input and stores it into a Redis key. After this, the data gets hosted on a temporary page inside the app. 
The url to this temporary page gets passed into a scraper method, which implements the Scrape-It library. 
Results from scraper operation then get formatted and stored inside another Redis key in order to render a preview of the result, which will finally store into Postgres database upon user’s “Approval” button click. 
Once the successfully scraped RYM list gets stored in the main db, the user can peruse it and also add iframe embed code for media related to each individual music release item (i.e. media players from such streaming services as YouTube, SoundCloud, Bandcamp and others).

Technologies used: 
- Node.js with Express.js
- HTML5/CSS3
- Handlebars.js
- Scrape-It library
- PostgreSQL with Sequelize
- Redis 
- Discogs API (integration of data from Discogs music database in the works)
