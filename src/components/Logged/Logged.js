import React, { Component } from 'react';
import { Request } from '../../libs/Libs';
import config from '../../config'


class Logged extends Component {

    constructor (props) {
        super(props);

        this.request = new Request();
    }

    componentDidMount () {
        let key = this.props.location.search.split('=')[1];
        this.getToken(key);
    }

    getToken (key) {

        // let data = this.request.encodeURI({
        //     grant_type: 'authorization_code',
        //     code: key,
        //     redirect_uri: config.redirect_uri,
		// 	client_id: config.client_id,
		// 	client_secret: config.client_secret
        // })

        // console.log(data)
		//
        // fetch('https://accounts.spotify.com/api/token', {
        //     method: 'POST',
        //     mode: 'cors',
        //     headers: {
		// 		'Accept': '*/*',
        //         //'Authorization': 'Basic ' + btoa(config.client_id + ':' + config.client_secret),
        //         'Content-Type': 'application/x-www-form-urlencoded'
        //     },
        //     body: data
        // }).then(res => {
		// 	console.log(res);
        //     return res.text();
        // }).then(res => {
        //     console.log(res);
        // })

		fetch('http://localhost:3555/getToken?code=' + key, {
			method: 'GET',
			mode: 'cors',
			headers: {
				'Accept': '*/*'
            },
		}).then(res => {
			return res.json();
		}).then(res => {
			console.log(res)
		}).catch(error => {
			console.log(error)
		})
    }

    render () {
        return (
            <div>
                callback / logged
            </div>
        )
    }
}


export default Logged;
