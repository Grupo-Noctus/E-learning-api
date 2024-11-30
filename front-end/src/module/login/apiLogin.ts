import axios from 'axios';

const apiLogin = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiLogin;