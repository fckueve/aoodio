const request = require('request');
const express = require('express');
const cors = require('cors');
const app = express();
const client_secret = {"client_secret": "5e3c073d6ccf4c659cc400c57b194b22"};

const api = require('./src/api.json');

let encodeURI = (data) => {
	let out = [];

	for (let name in data) {
		let key = encodeURIComponent(name);
		let value = encodeURIComponent(data[name]);
		out.push(key + "=" + value);
	}

	out = out.join('&');
	return out;
}

app.use(cors());

app.post('/getToken', function(req, res){
	let code = req.query.code;
	request({
		url: "https://accounts.spotify.com/api/token",
		method: "POST",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: encodeURI({
			...api,
			...{code, "grant_type": "authorization_code"},
			...client_secret
		})
	},
	function (error, response, data){
		res.send(data);
	});
});

app.post('/refreshToken', function(req, res){
	let refresh_token = req.query.refresh_token;
	request({
		url: "https://accounts.spotify.com/api/token",
		method: "POST",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: encodeURI({
			...api,
			...{refresh_token, 'grant_type': 'refresh_token'},
			...client_secret
		})
	},
	function (error, response, data){
		res.send(data);
	});
});


process.on('beforeExit', () => {
	app.close();
})

app.listen(api.port);
