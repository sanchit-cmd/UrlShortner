const express = require('express');
const { model } = require('mongoose');
const URL = require('../models/url');

const router = express.Router();

router.get('/', async (req, res) => {
	const allURLs = await URL.find({});
	res.render('home', {
		urls: allURLs,
	});
});

module.exports = router;
