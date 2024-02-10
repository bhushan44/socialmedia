import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login({ setuser }) {
  const [email, setmail] = useState("");

  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  async function handlesubmit() {
    try {
      const res = await fetch("http://localhost:5000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.status === "failure" && data.statusCode === 400) {
        return window.alert("please enter all fields");
      } else if (data.userExists === true && data.statusCode === 200) {
        console.log(data, "data");
        localStorage.setItem("user", data.data.user._id);
        // setuser(localStorage.getItem("user"));
        navigate("/home");
      } else {
        window.alert("user not exists");
      }
    } catch (e) {}
  }
  return (
    <div>
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
    </div>
  );
}
