import React, { Component } from 'react';

class Loaders extends Component {

    constructor (props) {
        super(props)

        this.loader = this.props.type || 'main';
        this.color = this.props.color || 'primaryColor'

        this.main = this.main.bind(this)
    }

    main () {
        let out = [];

        for (let i = 0; i < 9; i++) {
            out.push(
                <div key={i} className={`squer-${i} squer`}></div>
            );
        }

        return (
            <div className='center flex-wraper'> 
                {out}
            </div>
        )
    }

    render () {
        return (
            <div className='loader'>
                {this[this.loader]()}
            </div>
        )
    }
}

export default Loaders;
