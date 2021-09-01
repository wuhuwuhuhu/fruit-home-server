const express = require('express');
const axios = require('axios');
const app = express();

app.get('/', function (req, res) {
	res.send('Hello World!');
});
app.get('/picture_list', async (req, res) => {
	let data_parsed = undefined;
	try {
		const { data } = await axios.get(
			'https://passport-media.s3-us-west-1.amazonaws.com/images/eng-intern-interview/fruit-images.json'
		);
		data_parsed = data;
	} catch (e) {
		console.log(e);
		throw `Error: wrong path`;
	}
	res.json(data_parsed);
});

app.get('/fruit/:key', async (req, res) => {
	let data_parsed = undefined;
	try {
		const { data } = await axios.get(
			'https://www.fruityvice.com/api/fruit/' + req.params.key
		);
		data_parsed = data;
	} catch (e) {
		console.log(e);
		throw `Error: wrong path`;
	}
	console.log(data_parsed);
	res.json(data_parsed);
});

let server = app.listen(4000, function () {
	let host = server.address().address;
	let port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});
