import axios from "axios";

const baseUrl = "";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = baseUrl;
axiosInstance.defaults.withCredentials = true;


export default axiosInstance;