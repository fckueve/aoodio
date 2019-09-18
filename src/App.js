import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Cookies } from './libs/Libs';
import GlobalProvider from './GlobalProvider';
import config from './config';
import './App.scss';

const Login = React.lazy(() => import('./components/Login/Login'));
const Logged = React.lazy(() => import('./components/Logged/Logged'));
const Root = React.lazy(() => import('./components/Root/Root'));

class App extends Component {

    constructor (props) {
        super(props);

        this.state = {
            logged: this.checkIfLogged()
        }
    }

    checkIfLogged () {

        if (Cookies.get('access_token')) {
            return true;
        } else if (Cookies.get('refresh_token')) {
            this.refreshToken();
            return true;
        } else {
            return false;
        }
    }

    refreshToken () {
        fetch(`${config.host}${config.port !== 80 ? ':' + config.port : ''}/refreshToken?refresh_token=${Cookies.get('refresh_token')}`, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Accept': '*/*',
				'Content-Type': 'appilcation/json'
            },
		}).then(res => {
            return res.json()
        }).then(res => {
            console.log(res);
            this.setState({
                logged: true
            });
        }).catch(error => {
            console.log(error);
        })
    }

	loggedHandler (logged) {
		this.setState({
			logged
		})
	}

    render () {
        return (
			<GlobalProvider>
	            <Router>
	                <Suspense fallback={<div>Loading...</div>}>
	                    <Route path="/logged/" component={Logged} />
                        <Route path="/" component={Root} />
	                    {!this.state.logged ?
                            <Login /> : null
	                    }
	                </Suspense>
	            </Router>
			</GlobalProvider>
        )
    }
}

export default App;
