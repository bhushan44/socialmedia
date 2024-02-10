import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
// import { use } from "../../../backend/app";
export default function Userprofile() {
  const [info, setinfo] = useState();
  const { userid } = useParams();
  useEffect(function () {
    async function bhushan() {
      const res = await fetch(`http://localhost:5000/api/v1/users/${userid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });
      const data1 = await res.json();
      setinfo(data1.data.data);
      console.log(data1.data.data);
      // makecomment(data.data.posts.comments);
      // console.log(data);
    }
    bhushan();
  }, []);

  return (
    <div>
      dfd profile
      <img src={info?.photo} alt="bhus" height="500px" width="500px"></img>
    </div>
  );
}
