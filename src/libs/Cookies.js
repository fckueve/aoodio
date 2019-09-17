class Cookies {

    static set (name: String, value: Any, date: Number) {

        let expires;
        let now = new Date();
        now.setTime(now.getTime() + (date * 1000));
        expires = "expires="+ now.toUTCString();
        document.cookie = `${name}=${value};${expires};path=/`;
    }

    static get (cname: String) {

        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    static delete (name: String) {

		let expires;
        let now = new Date();
        now.setTime(now.getTime() - 100);
        expires = "expires="+ now.toUTCString();
        document.cookie = `${name}=ss;${expires};path=/`;
    }
}

export default Cookies;
