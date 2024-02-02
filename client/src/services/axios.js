import axios from "axios";
import Swal from "sweetalert2";

const API_URL = "https://billboard-sever.onrender.com/";

const instance = axios.create({
  baseURL: API_URL,
  timeout: 3000,
});

instance.interceptors.request.use(function (config) {
  config.headers.Authorization = sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user")).token
    : "";

  return config;
});

instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
  },
  function (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: `<a href="#">${error.message}</a>`,
    });
    console.log(error);
    sessionStorage.clear();
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
