## Sample 2-step scraper powered by ScrapeNinja JS execution engine.

Some websites "sign" the API request endpoints with special "cookie" header, and the real browser is needed to catch these "signature" headers. This greatly complicates the scraping process.

Example of such 403 error:
```
<HTML><HEAD>
<TITLE>Access Denied</TITLE>
</HEAD><BODY>
<H1>Access Denied</H1>

You don't have permission to access "website.com/url" on this server.<P>
Reference xxxx
</BODY>
</HTML>
```

# Installation
 - Clone the repo
 - Rename .env.dist to .env
 - Subscribe to https://rapidapi.com/restyler/api/scrapeninja 
 - Put your ScrapeNinja subscription key to RAPIDAPI_KEY variable in .env file.

then launch 
```
npm i
```

# Usage
## First step - dump cookies from real browser
This scraper `src/step1.js` is used to dump these headers (headers expire every 7-10 minutes, and step1.js can take up to 60 seconds to execute)

```
node src/step1.js
```


## Second step - scrape using dumped cookies
`src/step2.js` then launches much more performant scraping request to AJAX endpoint of the target website (can be executed multiple times, will re-use the same headers file generated by step1, avg latency 2-3 seconds). When the step2 script starts getting `Access denied` 403 error page, just re-launch step1.js to refresh the headers.
```
node src/step2.js
```

# Notes
Note how `/scrape-js` and `/scrape` endpoints of ScrapeNinja are used for different tasks: `/scrape-js` is heavy, and slow, but launches real browser. `/scape` endpoint is 10x faster and can be used to retrieve data quickly.