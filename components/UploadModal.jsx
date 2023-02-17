import React, { useRef, useState } from "react";
import { modalState } from "../atom/modalAtom";
import { useRecoilState } from "recoil";
import Modal from "react-modal";
import { AiOutlineCamera } from "react-icons/ai";

export default function UploadModal() {
  const [open, setOpen] = useRecoilState(modalState);
  const [selectedImage, setSelectedImage] = useState(null);

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
              accept="image/*"
              hidden
              ref={filerPickerRef}
            />
            <input
              type="text"
              maxLength={150}
              placeholder="Enter Caption"
              className="m-4 border-none text-center w-full focus:ring-0 "
            />
            <button
              disabled
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
