// --- Create express application ---
const express = require('express');
const app = express();

// --- Require in Routes ---
const router = require('./routes');

// -- Require in Path and serve static files --
const path = require('path');
app.use(express.static(path.join(__dirname + '/public')));

// --- Configure Nujucks to install to Express ---
// See, mozilla.github.io/nunjucks/getting-started.html
const nunjucks = require('nunjucks');
nunjucks.configure('views', {
	express: app
});

// --- Use Express Router ---
// See, expressjs.com/en/4x/api.html#app.use
app.use(router);


// --- Error Handling Middleware ---
app.use((err, req, res, next) => {
	console.log(`${err.fileName}: ${err.message}`);

	res
		.status(err.status)
		.render('index.html', {
			title: 'Error',
			partial : 'partials/error.html',
			message : err.message
		})
})

// -- Listen for Connection on Port 3000 --
app.listen(3000, () => {
	console.log('Listening on Port 3000');
});
