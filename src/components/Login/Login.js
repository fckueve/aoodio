import React, { Component } from 'react';
import { Row, Input } from 'reactstrap';
import './Login.scss';
import Button from '../Button/Button'
import { Request } from '../../libs/Libs';
import config from '../../config';

class Login extends Component {

    constructor (props) {
        super(props);

        this.request = new Request();
        this.sendHandler = this.sendHandler.bind(this);
    }

    sendHandler (e) {
        let form = document.querySelector('#loginForm');
        let data = this.request.serialize(form);
        let dataToSend = this.request.dataToUrl({
            client_id: config.client_id,
            response_type: 'code',
            scopes: config.scopes,
            redirect_uri: config.redirect_uri,
			show_dialog: 'true'
        })

        let url = encodeURI('https://accounts.spotify.com/authorize?' + dataToSend);
        console.log(url)

        window.location.href = url;

        // return fetch(url, {
        //     method: 'GET',
        //     mode: 'no-cors',
        //     headers: {
        //         'Accept': '*/*'
        //     }
        // }).then((res) => {
        //     return res.text();
        // }).then(res => {
        //     console.log(res)
        // })
    }

    render () {
        return (
            <div className="animated fadeIn">
                <div className="login">
                    <h2>Login to spotify</h2>
                    <form id="loginForm">
                        <Input type="text" name="login" placeholder="Login" />
                        <Input type="password" name="password" placeholder="password" />
                    </form>

                    <Button className="send" onClick={this.sendHandler}>
                        Login
                    </Button>
                </div>
            </div>
        );
    }
}


export default Login;
