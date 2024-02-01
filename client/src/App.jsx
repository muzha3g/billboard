import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Post from "./pages/Post";
import SinglePost from "./pages/SinglePost";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import { useEffect } from "react";

const ErrorProfile = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, []);
};

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/post" element={<Post />}></Route>
        <Route path="/:id" element={<SinglePost />} />
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/profile"
          element={<Profile />}
          errorElement={ErrorProfile}
        ></Route>
      </Routes>
    </>
  );
};

export default App;
