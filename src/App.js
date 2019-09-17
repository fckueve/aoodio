import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Cookies } from './libs/Libs';
import GlobalProvider from './GlobalProvider';
import './App.scss';

const Login = React.lazy(() => import('./components/Login/Login'));
const Logged = React.lazy(() => import('./components/Logged/Logged'));
const Root = React.lazy(() => import('./components/Root/Root'));

class App extends Component {

    constructor (props) {
        super(props);

        this.state = {
            logged: Cookies.get('access_token') ? true : false//// TODO: change to refresh if exist
        }
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
						<Route path="/" component={Root} />
	                    <Route path="/login/" component={Login} />
	                    <Route path="/logged/" component={Logged} />
	                    {!this.state.logged ?
	                        <Redirect to="/login/"/> : null
	                    }
	                </Suspense>
	            </Router>
			</GlobalProvider>
        )
    }
}

export default App;
