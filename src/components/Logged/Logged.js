import React, { Component } from 'react';
import { Request, Cookies } from '../../libs/Libs';
import config from '../../config'
import GlobalContext from '../../GlobalContext';


class Logged extends Component {

    constructor (props) {
        super(props);

		this.consumer = null;
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
		fetch(`${config.host}${config.port !== 80 ? ':' + config.port : ''}/getToken?code=` + key, {
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
				Cookies.set('refresh_token', res.refresh_token, res.expires_in * 24 * 30);
				Cookies.set('scope', res.scope, res.expires_in);
				Cookies.set('token_type', res.token_type, res.expires_in);

				this.props.history.push('/');
			}
		}).catch(error => {
			console.log(error)
		})
    }

	getProfile () {
		this.request.get('v1/me').then(res => {
			console.log(res);
		}).catch(error => {
			console.log(error)
		})
	}

	setConsumer (globalState) {
		this.consumer = globalState;
	}

    render () {
        return (
			<GlobalContext.Consumer>
				{context => (
					<div>
						callback / logged
						{this.setConsumer(context)}
					</div>
				)}
			</GlobalContext.Consumer>
        )
    }
}


export default Logged;
