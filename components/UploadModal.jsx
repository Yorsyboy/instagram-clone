import React, { useRef, useState } from "react";
import { modalState } from "../atom/modalAtom";
import { useRecoilState } from "recoil";
import Modal from "react-modal";
import { AiOutlineCamera } from "react-icons/ai";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { useSession } from "next-auth/react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

export default function UploadModal() {
  const [open, setOpen] = useRecoilState(modalState);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  //function to read the image
  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedImage(readerEvent.target.result);
    };
  };
  const filerPickerRef = useRef(null);
  const captionRef = useRef(null);

  const uploadPost = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      caption: captionRef.current.value,
      username: session.user.username,
      profilePic: session.user.image,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    await uploadString(imageRef, selectedImage, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );
    setOpen(false);
    setLoading(false);
    setSelectedImage(null);
  };

  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => {
            setOpen(false);
            setSelectedImage(null);
          }}
          className="max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md"
        >
          <div className="flex flex-col items-center justify-center h-[100%]">
            {selectedImage ? (
              <img
                onClick={() => setSelectedImage(null)}
                src={selectedImage}
                alt="Post image"
                className="max-h-[250px] w-full object-cover cursor-pointer"
              />
            ) : (
              <AiOutlineCamera
                onClick={() => filerPickerRef.current.click()}
                className="cursor-pointer text-9xl bg-red-200 p-2 rounded-full border-2  text-red-500"
              />
            )}
            <input
              onChange={addImageToPost}
              type="file"
              accept="image/*, video/*"
              hidden
              ref={filerPickerRef}
            />
            <input
              type="text"
              maxLength={150}
              placeholder="Enter Caption"
              className="m-4 border-none text-center w-full focus:ring-0 "
              ref={captionRef}
            />
            <button
              disabled={!selectedImage || loading}
              onClick={uploadPost}
              className="w-full bg-red-600 text-white p-2 shadow-md hover:brightness-125 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100"
            >
              Upload Post
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
