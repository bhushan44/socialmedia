import React from "react";
import { useState } from "react";
import axios from "axios";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const [name, setname] = useState("");
  const [email, setmail] = useState("");
  const [url, seturl] = useState("");
  const [image, setimage] = useState("");

  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  async function handlesubmit() {
    let cloudinaryData;
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "bhushan");
      try {
        const cloudinaryResponse = await fetch(
          "https://api.cloudinary.com/v1_1/bhush/image/upload", // Direct Cloudinary URL
          {
            method: "POST",
            body: formData,
          }
        );
        cloudinaryData = await cloudinaryResponse.json();
        console.log(cloudinaryData.secure_url);
        seturl(cloudinaryData.secure_url);
        // Send post data to backend

        // Clear fields after successful submission
        // setTitle("");
        // setBody("");
        // setImage(null);

        alert("Post submitted successfully!");
      } catch (error) {
        console.error("Error uploading image or submitting post:", error);
        alert("Failed to submit post. Please try again.");
      }
      const res = await fetch("http://localhost:5000/api/v1/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          url: cloudinaryData.secure_url,
        }),
      });
      const data = await res.json();
      console.log("ffdfd", data);
      if (data.statusCode === 200) {
        console.log(data);
        localStorage.setItem("jwt", data.token);
        // localStorage.setItem("user");
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
      <label>upload image</label>
      <input
        type="file"
        onChange={(e) => {
          const selectedFile = e.target.files[0]; // Assuming you only allow selecting one file
          setimage(selectedFile);
        }}
      />
      <button onClick={handlesubmit}>submit</button>
      <h1>{name}</h1>
    </div>
  );
}
