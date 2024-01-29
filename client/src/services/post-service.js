import axios from "axios";
const API_URL = "http://localhost:4000/";

class PostService {
  add(title, text, author) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL + "post/add",
      { title, text, author },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  edit() {}
  delete() {}

  getPosts() {
    return axios.get(API_URL);
  }

  getAPost(id) {
    return axios.get(API_URL + id);
  }
}

export default new PostService();
