import { fetchData } from './fetch.js';

export const get = ({ url }) => fetchData({ endpoint: url, init: { headers: {}, method: 'GET' } });

export const post = ({ url, data }) => fetchData({ endpoint: url, init: { headers: { 'Content-Type': 'application/json' }, method: 'POST', body: JSON.stringify(data) } });
