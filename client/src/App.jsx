import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Post from "./pages/Post";
import SinglePost from "./pages/SinglePost";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/post" element={<Post />}></Route>
        <Route path="/:id" element={<SinglePost />} />
        <Route path="/login"></Route>
        <Route path="/logout"></Route>
      </Routes>
    </>
  );
};

export default App;
