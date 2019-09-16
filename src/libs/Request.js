export class Request {


    constructor () {
        this.abortController = new AbortController()
    }

    post (urlSuffix, body) {
        return fetch('https://api.spotify.com/' + urlSuffix, {
            signal: this.abortController.signal,
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then((res) => {
            return res.json();
        })
    }

    get (urlSuffix) {
        return fetch('https://api.spotify.com/' + urlSuffix, {
            signal: this.abortController.signal,
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            return res.json();
        })
    }

    abort () {
        this.abortController.abort();
    }

    encodeURI (data) {
		let out = [];

		for (let name in data) {
			let key = encodeURIComponent(name);
			let value = encodeURIComponent(data[name]);
			out.push(key + "=" + value);
		}

		out = out.join('&');
		return out;
    }

    dataToUrl (data) {
        let out = '';

        for (let i in data) {
            out += `${i}=${data[i]}&`
        }

        return out.substring(0, out.length - 1);
    }

    serialize (node) {
        let out = {};

        [...node.querySelectorAll('input[name]')].forEach(item => {
            out[item.name] = item.value;
        })

        return out;
    }
}
