import React, { Component } from 'react';
import { Request } from '../../libs/Libs';
import config from '../../config'


class Logged extends Component {

    constructor (props) {
        super(props);

        this.request = new Request();
    }

    componentDidMount () {
        let key = this.props.location.search.split('=')[1];
        this.getToken(key);
    }

    getToken (key) {

        let data = this.request.encodeURI({
            grant_type: 'authorization_code',
            code: key,
            redirect_uri: 'http://localhost/:3000/token'
        })

        // let data = {
        //     grant_type: 'authorization_code',
        //     code: key,
        //     redirect_uri: 'http://localhost/:3000/token',
        // }

        console.log(data)

        fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Authorization': 'Basic ' + btoa(config.client_id + ':' + config.client_secret),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        }).then((res) => {
            return res.text();
        }).then(res => {
            console.log(res);
        })
    }

    render () {
        return (
            <div>
                callback / logged
            </div>
        )
    }
}


export default Logged;
