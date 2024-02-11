// import { application } from "express";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
// useEffect();import { BiLike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { Link } from "react-router-dom";
// import { unlink } from "../../../backend/routes/postroute";

export default function Homepage({ user }) {
  const [data, setdata] = useState([]);
  const [comment, makecomment] = useState([]);
  useEffect(function () {
    async function bhushan() {
      const res = await fetch("http://localhost:5000/api/v1/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });
      const data1 = await res.json();
      console.log(data1.data.posts);
      setdata(data1.data.posts);
      // makecomment(data.data.posts.comments);
      console.log(data1);
    }
    bhushan();
  }, []);
  const like = (id) => {
    fetch("http://localhost:5000/api/v1/posts/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setdata(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const unlikePost = (id) => {
    fetch("http://localhost:5000/api/v1/posts/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setdata(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function handlecomment(es, text, id) {
    fetch("http://localhost:5000/api/v1/posts/comments", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
        text: text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setdata(newData);
      })
      .catch((err) => {
        console.log(err);
      });
    es.target[0].value = "";
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "50px",
      }}
    >
      {data.map((e) => {
        return (
          <div
            style={{
              width: "500px",
              height: "800px",
              boxShadow: "4px 8px 5px 8px black",
              boxSizing: "border-box",
              margin: "50px",
            }}
          >
            <h1>
              <Link
                to={
                  e.postedBy?._id !== localStorage.getItem("user")
                    ? "/profile/" + e.postedBy?._id
                    : "/profile"
                }
                style={{ textDecoration: "none" }}
              >
                {e.postedBy.name}
              </Link>
            </h1>
            <img src={e.photo} alt="bhushan" width="500px" height="500px"></img>
            {console.log(localStorage.getItem("user"))}
            {!e.likes.includes(localStorage.getItem("user")) ? (
              <BiLike
                onClick={() => {
                  like(e._id);
                }}
              ></BiLike>
            ) : (
              <BiDislike
                onClick={() => {
                  unlikePost(e._id);
                }}
              ></BiDislike>
            )}
            <p>likes{e.likes.length}</p>
            <form
              onSubmit={(es) => {
                es.preventDefault();
                handlecomment(es, es.target[0].value, e._id);
              }}
            >
              <input
                type="text"
                placeholder="add a comment"
                style={{
                  border: "none",
                  outline: "none",
                  borderBottom: "2px dotted",
                }}
              />
            </form>
            <div
              style={{
                height: "100px",
                overflowY: "scroll",
              }}
            >
              {e.comments.map((com) => {
                return <p>{com.text}</p>;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
