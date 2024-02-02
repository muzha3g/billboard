import axios from "axios";
import blogApi from "./axios";
const API_URL = "https://billboard-sever.onrender.com/";

class PostService {
  add(payload) {
    return blogApi.post("post/add", payload);
  }

  update({ payload, url }) {
    return blogApi.put(url, payload);
  }

  delete(id) {
    return blogApi.delete("post/delete/" + id);
  }

  getPosts() {
    return axios.get(API_URL);
  }

  getAPost(id) {
    return axios.get(API_URL + id);
  }

  getProfilePost(id) {
    return blogApi.get("post/profile/" + id);
  }
}

export default PostService;
