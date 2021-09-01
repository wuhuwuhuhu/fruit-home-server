const express = require('express');
const axios = require('axios');
const app = express();
const fs = require('fs');
const https = require('https');
const key = fs.readFileSync('wuhd.site.key');
const cert = fs.readFileSync('wuhd.site.crt');

const options = {
	key: key,
	cert: cert,
};

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
	res.setHeader('Access-Control-Allow-Origin', '*');
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
	console.log(req);
	console.log(`requested at ${new Date().toLocaleString()} from `);
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.json(data_parsed);
});

https.createServer(options, app).listen(4000);
console.log('server running on port 4000');
