import * as api from './api.json';

delete api['default']['client_secret'];
const config = {
    ...api['default']
}

export default config;
