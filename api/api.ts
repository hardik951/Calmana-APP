import axios from "axios";

const api = axios.create({
  baseURL: "http://172.20.10.5:5000",
  timeout: 10000,
});

export default api;
