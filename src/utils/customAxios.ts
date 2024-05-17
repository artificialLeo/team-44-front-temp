import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

export const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token not found');
    }

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    return config;
};

export default axios;
