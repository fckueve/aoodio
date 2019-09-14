export class Storage {

    static save (key, val, self = false) {

        let save = {
            type: typeof val,
            value: val
        }

        if (self && self.constructor && typeof self.constructor.name === 'string') {
            save.parent = self.constructor.name;
        }

        localStorage.setItem(key, JSON.stringify(save))
    }

    static read (key) {
        let object = localStorage.getItem(key);

        if (object === null) {
            return false
        }

        object = JSON.parse(object);


        switch (object.type) {
            case 'number':
                return parseFloat(object.value);
            case 'string':
                return object.value;
            case 'object':
                return JSON.parse(object.value);
            case 'array':
                return JSON.parse(object.value);
            default:
                return object.value;
        }
    }

    static get (key) {
        return this.read(key)
    }

    static remove (key) {
        localStorage.removeItem(key)
    }
}
