// Require in ES6 Promises and Fetch
require('es6-promise').polyfill();
require('isomorphic-fetch');
// Require in Moment
const moment = require('moment');

// loop through array and construct hashtag
let createHashtag = (arr) => {
	let hashtag = '';

	for (let i in arr) {
		if (arr[i] === 'arsenal') {
			hashtag += 'ARS';
		} else if (arr[i] === 'bournemouth') {
			hashtag += 'BOU';
		} else if (arr[i] === 'brightonhovealbion') {
			hashtag += 'BHA';
		} else if (arr[i] === 'burnley') {
			hashtag += 'BUR';
		} else if (arr[i] === 'chelsea') {
			hashtag += 'CHE';
		} else if (arr[i] === 'crystalpalace') {
			hashtag += 'CRY';
		} else if (arr[i] === 'everton') {
			hashtag += 'EVE';
		} else if (arr[i] === 'huddersfieldtown') {
			hashtag += 'HUD';
		} else if (arr[i] === 'leicester') {
			hashtag += 'LEI';
		} else if (arr[i] === 'liverpool') {
			hashtag += 'LIV';
		} else if (arr[i] === 'mancity') {
			hashtag += 'MCI';
		} else if (arr[i] === 'manutd') {
			hashtag += 'MUN';
		} else if (arr[i] === 'newcastle') {
			hashtag += 'NEW';
		} else if (arr[i] === 'southampton') {
			hashtag += 'SOU';
		} else if (arr[i] === 'stoke') {
			hashtag += 'STK';
		} else if (arr[i] === 'swansea') {
			hashtag += 'SWA';
		} else if (arr[i] === 'tottenham') {
			hashtag += 'TOT';
		} else if (arr[i] === 'watford') {
			hashtag += 'WAT';
		} else if (arr[i] === 'westbrom') {
			hashtag += 'WBA';
		} else if (arr[i] === 'westham') {
			hashtag += 'WHU';
		}
	}

	return hashtag;
}


// Obj is equal to the JSON object returned from the Fetch API, iterate through the nested objects and push each match to the matchArray.
// Loop through the matchArray and find fixtures equal to the current date, if no fixtures are found add one day to the date variable,
// iterate through loop until matchArray[i].date === date, after 100 iterations (approx days in a pre-season) break out the loop.
let matchday = (Obj) => {
	let rounds = Obj.rounds;
	let matchlist = [];

	let date = moment().format('YYYY-MM-DD');
	let matchArray = [];

	for (let i in rounds) {
		let matches = rounds[i].matches;

		for (let i in matches) {
			matchArray.push(matches[i])
		}
	}

	for (let i in matchArray) {
		if (matchArray[i].date === date) {
			matchlist.push = matchArray[i];
		}
	}

	let count = 0;
	while (matchlist.length === 0) {
		if (count === 100) break; // After 100 iterations break out the loop;
		count ++

		date = moment(date, "YYYY-MM-DD").add(1, 'day').format('YYYY-MM-DD');
		for (let i in matchArray) {
			if (matchArray[i].date === date) {
				let match = {
					date : matchArray[i].date,
					fixture : `${matchArray[i].team1.name} v ${matchArray[i].team2.name}`,
					hashtag : createHashtag([matchArray[i].team1.key, matchArray[i].team2.key])
				}
				matchlist.push(match);
			}
		}
	}
	return matchlist;
}


// Check API response status
let status = (res) => {
	if (res.status !== 200) {
		let err = new Error(res.body);
		err.fileName = 'home.js';
		err.status = res.status;
		return next(err);
	} else {
		return res;
	}
}

// Fetch API response render index.html template and pass the partial name and data in the object.
module.exports.api = (req, res, next) => {
	fetch('https://raw.githubusercontent.com/opendatajson/football.json/master/2017-18/en.1.json')
	.then((response) => {
		status(response)
		return response.json()
	}).then((Obj) => {
		return matchday(Obj);
	}).then((data) => {
		if (data.length == 0) {
			return res
					.status(200)
					.render('index.html', {
						title : 'Seasons Over! Come back again next season',
						partial : 'partials/over.html'
					});
		}

		let date = moment(data[0].date).format('dddd Do MMMM');
		res
			.status(200)
			.render('index.html', {
				title : date,
				partial : 'partials/home.html',
				data: data
			})
	}).catch((err) => {
		err.message = 'Internal Server Error';
		err.fileName = 'home.js';
		err.status = 500;
		return next(err);
	});
}
