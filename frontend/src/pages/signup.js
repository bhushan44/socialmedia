import React from "react";
import { useState } from "react";
import axios from "axios";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const [name, setname] = useState("");
  const [email, setmail] = useState("");

  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  async function handlesubmit() {
    try {
      const res = await fetch("http://localhost:5000/api/v1/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const data = await res.json();
      console.log("ffdfd", data);
      if (data.statusCode === 200) {
        console.log(data.status);
        return navigate("/login");
      }

      //   navigate("/login");
      else if (data.statusCode === 400 && data.userExists === true) {
        window.alert("userExits with given mail");
      } else {
        window.alert("fill all fields");
      }
    } catch (e) {
      console.log("nbn", e);
    }
  }
  return (
    <div>
      <label>enter name</label>
      <input
        type="text"
        placeholder="enter your name"
        value={name}
        onChange={(e) => {
          setname(e.target.value);
        }}
      ></input>
      <br></br>
      <label>enter email</label>

      <input
        type="email"
        placeholder="mail"
        value={email}
        onChange={(e) => {
          setmail(e.target.value);
        }}
      ></input>
      <br></br>
      <label>enter your password</label>

      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => {
          setpassword(e.target.value);
        }}
      ></input>
      <button onClick={handlesubmit}>submit</button>
      <h1>{name}</h1>
    </div>
  );
}
