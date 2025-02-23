import axios from 'axios';

const BASE_URL = 'https://br-fe-assignment.github.io'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});


export default axiosInstance;
