import axios from "axios";
const API_URL = "http://localhost:4000/";

class PostService {
  add(title, text) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL + "post/add",
      { title, text },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  update(title, text, id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL + "post/updated" + id,
      { title, text },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  delete(id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.delete(API_URL + "post/delete/" + id, {
      headers: {
        Authorization: token,
      },
    });
  }

  getPosts() {
    return axios.get(API_URL);
  }

  getAPost(id) {
    return axios.get(API_URL + id);
  }

  getProfilePost(id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "post/profile/" + id, {
      headers: {
        Authorization: token,
      },
    });
  }
}

export default new PostService();
