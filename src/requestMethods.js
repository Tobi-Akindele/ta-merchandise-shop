import axios from 'axios';

const BASE_URL = 'http://localhost:9000/api/';
let persistRoot = localStorage.getItem('persist:root');
const TOKEN =
  persistRoot &&
  JSON.parse(persistRoot) &&
  JSON.parse(JSON.parse(persistRoot).login) &&
  JSON.parse(JSON.parse(persistRoot).login).currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${TOKEN}` },
});
