import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function Profile() {
  const [info, setinfo] = useState("");
  useEffect(function () {
    async function bhushan() {
      const res = await fetch("http://localhost:5000/api/v1/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });
      const data1 = await res.json();
      setinfo(data1.data.result);
      // console.log(data1.data.posts);
      // setdata(data1.data.posts);
      // makecomment(data.data.posts.comments);
      console.log(data1);
    }
    bhushan();
  }, []);
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "50px",
        }}
      >
        {" "}
        <img
          src={info.photo}
          alt="bhushan"
          width="300px"
          height="300px"
          style={{ borderRadius: "50%" }}
        ></img>
        <div>
          <h3> name:{info.name}</h3>
          <h3> email:{info.email}</h3>
        </div>
      </div>
    </div>
  );
}
