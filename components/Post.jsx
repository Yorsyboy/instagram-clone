import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import Moment from 'react-moment';
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

export default function Post({ id, username, userImg, img, caption }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState(" ");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // fetch the comments from the database
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [db, id]);

  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment(" ");

    // add the comment to the database
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };
  return (
    <div
      className="bg-white my-7 border-1 rounded-md
    "
    >
      {/* Post header */}
      <div className="flex items-center p-5">
        <img
          className="h-12 rounded-full object-cover border-1 p-1 mr-3"
          src={userImg}
          alt="User image"
        />
        <p className="font-bold flex-1">{username}</p>
        <BsThreeDots />
      </div>

      {/* Post image */}
      <img className="w-full object-cover" src={img} alt="Post Image" />

      {/* Post buttons */}
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            <AiOutlineHeart className="btn" />
            <FaRegComment className="btn" />
          </div>
          <BsBookmark className="btn" />
        </div>
      )}

      {/* Post caption */}
      <p className="p-5 truncate">
        <span className="font-bold mr-1">{username}</span>
        {caption}
      </p>
      {comments.length > 0 && (
        <div className="mx-10 max-h-24 overflow-y-scroll scrollbar-none">
          {comments.map((comment) => (
            <div className="flex items-center space-x-2 mb-2">
              <img className="h-7 rounded-full object-cover" src={comment.data().userImage} alt="userImage" />
              <p className="font-semibold">{comment.data().username}</p>
              <p className="flex-1 truncate">{comment.data().comment}</p>
              <Moment fromNow>
                {comment.data().timestamp?.toDate().toLocaleString()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* Post comments Input */}
      {session && (
        <form className="flex items-center p-4">
          <HiOutlineEmojiHappy className="" />
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border-none flex-1 focus:ring-0"
            type="text"
            placeholder="Enter your comment"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="text-blue-400 font-bold disabled:text-blue-200"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}
