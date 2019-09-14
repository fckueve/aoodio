import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import './App.scss';

const Login = React.lazy(() => import('./components/Login/Login'));
const Logged = React.lazy(() => import('./components/Logged/Logged'));

class App extends Component {

    constructor (props) {
        super(props);


        this.state = {
            logged: true
        }
    }

    render () {
        return (
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Route path="/login/" component={Login} />
                    <Route path="/logged/" component={Logged} />
                    {!this.state.logged ?
                        <Redirect to="/login/"/> : null
                    }
                </Suspense>
            </Router>
        )
    }
}

export default App;
