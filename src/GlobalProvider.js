import React, { Component } from 'react';
import { Request } from './libs/Libs';
import GlobalContext from './GlobalContext';


class GlobalProvider extends Component {

	constructor (props) {
		super(props)

		this.state = {
			user: null
		}

		this.request = new Request();
	}

	componentDidMount () {

	}


	render () {
		let self = this;
		return (
			<GlobalContext.Provider value={{
					state: this.state,
					handlers: {}
				}}>
				{this.props.children}
			</GlobalContext.Provider>
		);
	}
}

export default GlobalProvider;
