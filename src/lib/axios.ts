import Axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.response.use((response) => response.data);
