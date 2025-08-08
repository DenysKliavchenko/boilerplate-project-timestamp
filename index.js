// index.js
// where your node app starts

// init project
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// enable CORS so that your API is remotely testable by FCC
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// serve static assets (if you have a public folder)
app.use(express.static('public'));

// basic routing
app.get('/', function (req, res) {
res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// sample endpoint
app.get('/api/hello', function (req, res) {
res.json({ greeting: 'hello API' });
});

// Timestamp Microservice
// Handles:
// - GET /api -> current time
// - GET /api/:date -> either UNIX ms timestamp or date string
app.get('/api/:date?', (req, res) => {
const { date } = req.params;

// If no date provided, return current time
if (!date) {
const now = new Date();
return res.json({
unix: now.getTime(),
utc: now.toUTCString(),
});
}

let d;

// If the param is an integer string (possibly negative), treat as UNIX ms
if (/^-?\d+$/.test(date)) {
d = new Date(Number(date));
} else {
// Otherwise, treat as date string
d = new Date(date);
}

// Validate date
if (isNaN(d.getTime())) {
return res.json({ error: 'Invalid Date' });
}

// Success
return res.json({
unix: d.getTime(),
utc: d.toUTCString(),
});
});

// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, function () {
console.log('Your app is listening on port ' + listener.address().port);
});