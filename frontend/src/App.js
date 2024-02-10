import logo from "./logo.svg";
import "./App.css";
import Signup from "./pages/signup";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import PostForm from "./pages/CreatePost";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Profile from "./pages/Profile";
import Userprofile from "./pages/Userprofile";
import { useState } from "react";
function App() {
  // const navigate = useNavigate();
  const [user, setuser] = useState("");

  return (
    <div>
      <div
        style={{
          display: "flex",
          backgroundColor: "blue",
          justifyContent: "space-between",
          padding: "30px",
          color: "white",
          fontSize: "30px",
        }}
      >
        <div>
          <b>social media</b>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "50px",
            color: "white",
          }}
        >
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>signup</b>
          </Link>

          <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
            <b style={{ textDecoration: "none" }}>login</b>
          </Link>
          <Link
            to="/createpost"
            style={{ textDecoration: "none", color: "white" }}
          >
            uploadpost
          </Link>
          <Link
            to="/profile"
            style={{ textDecoration: "none", color: "white" }}
          >
            profile
          </Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Signup></Signup>}></Route>
        <Route path="/login" element={<Login setuser={setuser} />}></Route>
        <Route path="/home" element={<Homepage user={user}></Homepage>}></Route>
        <Route path="/createpost" element={<PostForm></PostForm>}></Route>
        <Route exact path="/profile" element={<Profile></Profile>}></Route>
        <Route
          path="/profile/:userid"
          element={<Userprofile></Userprofile>}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
