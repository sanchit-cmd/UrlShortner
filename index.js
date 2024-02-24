const express = require('express');
const path = require('path');

const urlRoute = require('./routes/url');
const staticRouter = require('./routes/staticRouter');

const { connectDb } = require('./connect');
const URL = require('./models/url');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDb('mongodb://0.0.0.0:27017/short-url').then(() =>
	console.log('mongoDb connected')
);

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use('/url', urlRoute);
app.use('/', staticRouter);

app.get('/api/:shortId', async (req, res) => {
	const shortId = req.params.shortId;

	const entry = await URL.findOneAndUpdate(
		{
			shortId,
		},
		{
			$push: {
				visitHistory: {
					timestamp: Date.now(),
				},
			},
		}
	);
	res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
	console.log('Server running');
});
