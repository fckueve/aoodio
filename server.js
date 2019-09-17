const request = require('request');
const express = require('express');
const cors = require('cors');
const app = express();

const api = require('./src/api.json')

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
		body: encodeURI({...api, ...{code:code}})
	},
	function (error, response, data){
		res.send(data);
	});
});

process.on('beforeExit', () => {
	app.close();
})

app.listen(3555);
