// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", (req, res) => {
  res.json({ greeting: 'hello API' });
});

app.get("/api", (req, res) => {
  let date = new Date();
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

app.get("/api/:date?", (req, res) => {
  let dateString = req.params.date;
  let unixTime = new Date(dateString).getTime();
  let utcTime = new Date(dateString).toUTCString();
  let numberRegex = /[0-9]/;
  if (numberRegex.test(dateString)) {
    if (Boolean(unixTime) == false) {
      unixTime = parseInt(dateString);
      utcTime = new Date(unixTime).toUTCString();
    }
    res.json({ unix: unixTime, utc: utcTime });
  } else {
    res.json({ error: utcTime });
  }
});



// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
