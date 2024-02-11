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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "400px",
          height: "400px",
          boxSizing: "border-box",
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
          // justifyContent: "center",
          padding: "40px",
          gap: "20px",
        }}
      >
        <h1 style={{ textAlign: "center" }}> login</h1>
        <div>
          {" "}
          <label style={{ display: "block" }}>enter email</label>
          <input
            style={{ width: "100%" }}
            type="email"
            placeholder="mail"
            value={email}
            onChange={(e) => {
              setmail(e.target.value);
            }}
          ></input>
        </div>

        <div>
          <label style={{ display: "block" }}>enter your password</label>
          <input
            type="text"
            placeholder="password"
            value={password}
            style={{ display: "block", width: "100%" }}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          ></input>
        </div>

        <button onClick={handlesubmit}>submit</button>
      </div>
    </div>
  );
}
