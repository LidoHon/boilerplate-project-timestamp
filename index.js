// Initialize project
const express = require('express');
const app = express();
require('dotenv').config();
// Enable CORS (Cross-Origin Resource Sharing)
// so that your API is remotely testable
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route to serve the HTML file
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

// First API endpoint
app.get('/api/hello', function (req, res) {
	res.json({ greeting: 'hello API' });
});

// Timestamp API endpoint
app.get('/api/:date?', function (req, res) {
	const dateParam = req.params.date;

	let date;

	if (dateParam) {
		// Check if the dateParam is a valid Unix timestamp
		if (/^\d+$/.test(dateParam)) {
			// If it's a valid timestamp, create a Date object from it
			date = new Date(parseInt(dateParam));
		} else {
			// Otherwise, try to parse the date string
			date = new Date(dateParam);
		}
	} else {
		// If no dateParam is provided, use the current date
		date = new Date();
	}

	// Check if the date is valid
	if (isNaN(date.getTime())) {
		return res.json({ error: 'Invalid Date' });
	}

	// Return the Unix timestamp and UTC date string
	res.json({
		unix: date.getTime(),
		utc: date.toUTCString(),
	});
});

// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, function () {
	console.log('Your app is listening on port ' + listener.address().port);
});
