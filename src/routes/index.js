const express = require('express');
const router = express.Router();

let home = require('./home.js');
let match = require('./match.js');

// Home Route
router
	.route('/')
	.get(home.api);

// Match Route
router
	.route('/:match')
	.get(match.api);

// Catch all
router
	.route('*')
	.get((req, res) => {
		res.redirect('/');
	})

module.exports = router;
