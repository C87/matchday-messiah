const OAuth = require('oauth');
require('dotenv/config')

// Twitter API call using OAuth
module.exports.api = (req, res, next) => {
	let hashtag = `${req.params.match}`;

	let oauth = new OAuth.OAuth(
		'https://api.twitter.com/oauth/request_token',
		'https://api.twitter.com/oauth/access_token',
		process.env.CONSUMER_KEY,
		process.env.APPLICATION_SECRET,
		'1.0A',
		null,
		'HMAC-SHA1'
		);

	oauth.get(`https://api.twitter.com/1.1/search/tweets.json?q=%23${hashtag}&count=100`,
	'915158054848647169-6rCvRHnF388rjUDeBxhSBfUrcOAtIU8', //test user token
	'0DclXAUQMqOnl7QXkdeFS3AZZmHYo9fYA8AmI2LNMUaSg', //test user secret
	(e, data, response) => {
		if (e) {
			let err = new Error(e.response.body);
			err.fileName = 'match.js';
			err.status = e.res.status;
			return next(err);
		}

		let parsedData = JSON.parse(data);
		let feed = [];

		for (let i in parsedData.statuses) {
			let status = parsedData.statuses[i];
			feed.push({
				user : status.user.name,
				handle : `@${status.user.screen_name}`,
				profile_image : status.user.profile_image_url,
				profile_url : `https://twitter.com/${status.user.screen_name}`,
				text : status.text,
				tweet_url : `https://twitter.com/${status.user.screen_name}/status/${status.id_str}`
			});
		}

		res
			.status(200)
			.render('index.html', {
				title: `#${hashtag}`,
				title_url : `https://twitter.com/hashtag/${hashtag}`,
				partial : 'partials/match.html',
				data: feed
			})
	});
}
