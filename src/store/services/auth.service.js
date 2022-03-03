import axiosApi from './api.helper';

const API_URL = "api/auth/"
class AuthService {
  login(username, password) {
    return axiosApi
      .post(API_URL + "signin", { username, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(data) {
    return axiosApi.post(API_URL + "signup", data);
  }
}

export default new AuthService();