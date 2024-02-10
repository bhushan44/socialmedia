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
      profilepage
      <img src={info.photo} alt="bhushan" width="500px" height="500px"></img>
    </div>
  );
}
