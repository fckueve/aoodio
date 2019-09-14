import React, { Component } from 'react';
import { Row, Input } from 'reactstrap';
import './Login.scss';

class Login extends Component {

    render () {
        return (
            <div className="animated fadeIn">
                <div className="login">
                    <h2>Login to spotify</h2>
                    <form if="loginForm">
                        <Input type="text" name="login" placeholder="Login" />
                        <Input type="password" name="password" placeholder="password" />
                    </form>
                    <div className="send button loader">
                        Login
                    </div>
                </div>
            </div>
        );
    }
}


export default Login;
