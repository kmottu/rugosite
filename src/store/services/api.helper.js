import axios from "axios";
import { logout } from '../actions/auth';
import store from '..';

let BASE_URL = "/";

if (process.env.NODE_ENV === "development") {
  BASE_URL = "http://localhost:3010/"
}

const axiosApi = axios.create({
  baseURL: BASE_URL,
})

axiosApi.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error)
  }
)

export default axiosApi;