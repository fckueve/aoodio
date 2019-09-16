var postQuery = 'grant_type=client_credentials ';
var request = require('request');
var express = require('express');
var app = express();

const apikey = {
	client_id: 'edde4c781ed64842bbc5ca510cc17e23',
	client_secret: '5e3c073d6ccf4c659cc400c57b194b22',
	redirect_uri: 'http://localhost:3000/logged/',
	grant_type: 'authorization_code'
}

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

app.get('/getToken', function(req, res){
	let code = req.query.code;
	request({
		url: "https://accounts.spotify.com/api/token",
		method: "POST",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: encodeURI({...apikey, ...{code:code}})
	},
	function (error, response, data){
		console.log(data)
		res.send(data);
	});
});

process.on('beforeExit', () => {
	app.close();
})

app.listen(3555);
