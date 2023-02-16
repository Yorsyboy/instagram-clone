import React from "react";
import Post from "./Post";

export default function Posts() {
  const posts = [
    {
      id: "1",
      username: "johndoe",
      userImg:
        "https://images.unsplash.com/photo-1616166330001-8b8b0b0b5b1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      img: "https://images.unsplash.com/photo-1616166330001-8b8b0b0b5b1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      caption: "This is a caption",
    },
    {
      id: "2",
      username: "yorsboy",
      userImg:
        "https://images.unsplash.com/photo-1616166330001-8b8b0b0b5b1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      img: "https://images.unsplash.com/photo-1616166330001-8b8b0b0b5b1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      caption: "This is a caption",
    }, 
  ];
  return <div>
        {posts.map((post) => (
            <Post key={post.id}
                id={post.id}
                username={post.username}
                userImg={post.userImg}
                img={post.img}
                caption={post.caption}
            />
        ))}
  </div>;
}
