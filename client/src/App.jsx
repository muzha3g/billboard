import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Post from "./pages/Post";
import SinglePost from "./pages/SinglePost";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import AuthService from "./services/auth-service";

const App = () => {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  return (
    <>
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/post"
          element={
            <Post currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        ></Route>
        <Route path="/:id" element={<SinglePost />} />
        <Route path="/signup" element={<SignUp />}></Route>
        <Route
          path="/login"
          element={
            <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        ></Route>
        <Route path="/logout"></Route>
        <Route
          path="/profile"
          element={
            <Profile
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        ></Route>
      </Routes>
    </>
  );
};

export default App;
