import React, { Component } from 'react';


class Button extends Component {

    constructor (props) {
        super(props);

        this.className = this.props.className ? this.props.className : '';
        this.onClick = this.props.onClick ? this.props.onClick : () => {};
    }

    loading () {
        return (
            <div onClick={this.onClick} className={`button loading ${this.className}`}>
                <span>{this.props.children}</span>
                <span>loading</span>
            </div>
        )
    }

    render () {
        if (this.props.type) {
            return this[this.props.type]()
        } else {
            return (
                <div onClick={this.onClick} className={`button ${this.className}`}>
                    {this.props.children}
                </div>
            )
        }
    }
}

export default Button;
