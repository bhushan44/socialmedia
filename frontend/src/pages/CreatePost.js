import React, { useState } from "react";
import { useEffect } from "react";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [url, seturl] = useState("");
  useEffect(
    function () {
      fetch("http://localhost:5000/api/v1/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          imageUrl: url,
        }),
      }).then((res) => {
        res.json().then((data) => {
          console.log(data);
        });
      });
    },
    [url]
  );

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    // Upload image to Cloudinary
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
      const cloudinaryData = await cloudinaryResponse.json();
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
  };

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
        }}
      >
        <h1 style={{ textAlign: "center" }}> upload post</h1>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
        />
        <br></br>
        <label htmlFor="body">Body:</label>
        <textarea id="body" value={body} onChange={handleBodyChange} />
        <br></br>
        <label htmlFor="image">Upload Image:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
        />
        <br></br>
        <button onClick={handleSubmit}>Submit Post</button>
      </div>
    </div>
  );
};

export default PostForm;
