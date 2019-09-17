import React, { Component } from 'react';
import { Row, Input } from 'reactstrap';
import { Request } from '../../libs/Libs';
import Button from '../Button/Button'
import config from '../../config';
import './Login.scss';

class Login extends Component {

    constructor (props) {
        super(props);

        this.request = new Request();
        this.sendHandler = this.sendHandler.bind(this);
    }

    sendHandler (e) {
        let dataToSend = this.request.dataToUrl({
            client_id: config.client_id,
            response_type: 'code',
            scopes: config.scopes,
            redirect_uri: config.redirect_uri,
			show_dialog: 'true'
        })

        let url = encodeURI('https://accounts.spotify.com/authorize?' + dataToSend);
        window.location.href = url;
    }

    render () {
        return (
            <div className="animated fadeIn">
                <div className="login">
                    <h2>Login to spotify</h2>

                    <Button className="send" onClick={this.sendHandler}>
                        Login
                    </Button>
                </div>
            </div>
        );
    }
}


export default Login;
