// 跟登入登出有關的，都來找這個檔案
import axios from "axios";
const AUTH_URL = "http://localhost:4000/auth";

class AuthService {
  login() {}
  logout() {}
  register(name, email, password) {
    return axios.post(AUTH_URL, {
      name,
      email,
      password,
    });
  }
}

export default new AuthService();
