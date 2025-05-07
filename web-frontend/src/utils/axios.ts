import axios from 'axios';
console.log(`${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}`);
export const backend = axios.create({
    baseURL: `${process.env.BACKEND_URL || 'http://localhost'}:${process.env.BACKEND_PORT || 3000}`
});
