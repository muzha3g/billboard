// 跟登入登出有關的，都來找這個檔案
import axios from "axios";
const AUTH_URL = "https://billboard-sever.onrender.com/" + "auth/";

class AuthService {
  login(email, password) {
    return axios.post(AUTH_URL + "login", {
      email,
      password,
    });
  }

  logout() {
    sessionStorage.removeItem("user");
  }

  signup(name, email, password) {
    return axios.post(AUTH_URL + "signup", {
      name,
      email,
      password,
    });
  }

  getCurrentUser() {
    try {
      return JSON.parse(sessionStorage.getItem("user"));
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  }
}

export default new AuthService();
