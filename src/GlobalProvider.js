import React, { Component } from 'react';
import { Request } from './libs/Libs';
import GlobalContext from './GlobalContext';


class GlobalProvider extends Component {

	constructor (props) {
		super(props)

		this.state = {
			user: null,
			logged: false,
			loginInProgress: false
		}

		this.request = new Request();
		this.logged = this.logged.bind(this)
		this.loginInProgress = this.loginInProgress.bind(this)
	}

	logged (value) {
		this.setState({logged: value})
	}

	loginInProgress (value) {
		this.setState({logged: value})
	}

	render () {
		let self = this;
		return (
			<GlobalContext.Provider value={{
					state: this.state,
					handlers: {
						logged: this.logged,
						loginInProgress: this.loginInProgress
					}
				}}>
				{this.props.children}
			</GlobalContext.Provider>
		);
	}
}

export default GlobalProvider;
