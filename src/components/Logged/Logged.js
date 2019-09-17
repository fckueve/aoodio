import React, { Component } from 'react';
import { Request, Cookies } from '../../libs/Libs';
import config from '../../config'


class Logged extends Component {

    constructor (props) {
        super(props);

        this.request = new Request();
    }

    componentDidMount () {
        let key = this.props.location.search.split('=')[1];

		if (!Cookies.get('access_token')) {

			this.getToken(key);
		} else {
			this.getProfile();
		}
    }

    getToken (key) {

		fetch('http://localhost:3555/getToken?code=' + key, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Accept': '*/*',
				'Content-Type': 'appilcation/json'
            },
		}).then(res => {
			return res.json();
		}).then(res => {
			if (!res.error) {
				Cookies.set('access_token', res.access_token, res.expires_in);
				Cookies.set('refresh_token', res.refresh_token, res.expires_in);
				Cookies.set('scope', res.scope, res.expires_in);
				Cookies.set('token_type', res.token_type, res.expires_in * 24 * 30);
				this.getProfile();
			}
		}).catch(error => {
		})
    }

	getProfile () {
		this.request.get('v1/me').then(res => {
			console.log(res);
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
