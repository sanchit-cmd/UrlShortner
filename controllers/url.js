const shortid = require('shortid');
const URL = require('../models/url');

async function generateNewShortURL(req, res) {
	const body = req.body;
	if (!body.url) return res.status(400).json({ error: 'URL is required' });

	const shortId = shortid();

	console.log(shortid);

	await URL.create({
		shortId: shortId,
		redirectURL: body.url,
		visitHistory: [],
	});

	return res.render('home', {
		id: shortId,
	});
	// return res.json({ id: shortId });
}

module.exports = {
	generateNewShortURL,
};