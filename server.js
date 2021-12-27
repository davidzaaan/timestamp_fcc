// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204
const port = process.env.PORT || 3000;

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/:date', (req, res) => {

  try {
    const date = Number(req.params.date); // cast it into a Number JavaScript data-type
    const utc = new Date(Number(date)); // create a new date with that number

    // Number returns either NaN or the number itself...
    // verify if the number is not NaN
    if (!date) {
      throw new Error()
    }

    // if everything went well...
    return res.json({
      unix: date,
      utc: utc.toUTCString()
    })
  } catch {

    try {
      const utc = new Date(req.params.date).toUTCString(); // converting the date to the UTC standard format
      const unix = Date.parse(req.params.date); // converting the date to its unix value

      // Date constructor can return 'Invalid Date' if so
      // here verifies that return value
      if (utc === 'Invalid Date') {
        throw new Error('invalid date')
      }

      res.json({
        unix: unix,
        utc: utc
      })

    } catch {
      //... if something went wrong
      res.json({
        error: 'Invalid Date'
      })
    }
  }

})


app.get('/api/', (req, res) => {
  const date = new Date();
  const unix = Date.parse(date);
  const utc = date.toUTCString();

  res.json({
    unix: unix,
    utc: utc
  })
})


// listen for requests :)
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});

// listener.address().port
// var listener = 