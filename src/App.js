import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import './App.scss';

const Login = React.lazy(() => import('./components/Login'));

class App extends Component {

    constructor (props) {
        super(props);


        this.state = {
            logged: false
        }
    }

    render () {
        return (
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Route path="/login/" component={Login} />
                    {!this.state.logged ?
                        <Redirect to="/login/"/> : null
                    }
                </Suspense>
            </Router>
        )
    }
}

export default App;
