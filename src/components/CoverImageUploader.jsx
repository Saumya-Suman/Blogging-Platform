// src/components/CoverImageUploader.jsx

import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { useState } from "react";
import { setImageFromUrl, removeCoverImage } from "../utils/coverSlice";
import { setImageFile, setImageUrl } from "../utils/coverSlice";
import { setActiveTab } from "../utils/coverSlice";
import {setShowUploader } from "../utils/coverSlice";

const CoverImageUploader = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
 
  const { activeTab, previewVisible, imageUrl } = useSelector((state) => state.story);
  const [urlInput, setUrlInput] = useState("");
  // const {previewVisible, imageUrl} = useSelector((state) => state.urlSlice);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

 const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const previewURL = URL.createObjectURL(file);
    // dispatch(setCoverImage({ previewUrl, file })); // 👈 store both
    dispatch(setImageFile(file));
    dispatch(setImageUrl(previewURL));
  }
};

  const handleRemoveImage = (e) => {
    e.stopPropagation(); // prevent triggering file input
   dispatch(removeCoverImage());  // clear image from Redux
  };

  const handleAddImage = () => {
    if (urlInput.trim()) {
      dispatch(setImageFromUrl(urlInput.trim()));
      setUrlInput("");
    }
  };

  const handleRemove = () => {
    dispatch(removeCoverImage());
  };

  return (
    <div className="border-2 border-dashed rounded-xl p-6 text-center">
      <div className="flex justify-center mb-4 gap-3">
        <button
          onClick={() => dispatch(setActiveTab("upload"))}
          className={`px-4 py-2 rounded-md border ${
            activeTab === "upload"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          Upload
        </button>
        <button
          onClick={() => dispatch(setActiveTab("url"))}
          className={`px-4 py-2 rounded-md border ${
            activeTab === "url"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          URL
        </button>
      </div>
      {activeTab === "upload" ? (
        <>
          <div
            className="border-2 border-dashed rounded-xl text-gray-500 p-8 w-full hover:bg-gray-200/30 mb-8 items-center justify-center cursor-pointer relative"
            onClick={handleButtonClick}
          >
            {previewVisible ? (
              <>
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="object-cover rounded-lg"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-black/70 text-white rounded-md px-3 py-1 text-sm hover:bg-black transition"
                >
                  Remove Image
                </button>
              </>
            ) : (
              <>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/10009/10009684.png"
                  alt="upload-img"
                  className="w-12 h-12 mx-auto mb-4 text-gray-600"
                />
                <p className="font-medium">Choose an image file</p>
                <p className="text-sm">or drag and drop it here</p>
                <p className="text-xs mt-2 text-gray-400">
                  PNG, JPG, GIF up to 5MB
                </p>
              </>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </>
      ) : (
        // show URL input box
        <div className="flex flex-col items-center ">
          {!previewVisible ? (
            <div>
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                className="w-full border rounded-md p-2 text-gray-600"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
              />
              <button
                onClick={handleAddImage}
                className=""
                disabled={!urlInput.trim()}
              >
                Add Image
              </button>
            </div>
          ) : (
            <div>
              <img src={imageUrl} alt="image-url" className="" />
              <button onClick={handleRemove} className="">
                Remove Image
              </button>
            </div>
          )}
        </div>
      )}
      <button
        onClick={() => dispatch(setShowUploader(false))}
        className={`px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md ${
          activeTab === "url" ? "mt-5" : "-mt-1"
        }`}
      >
        Cancel
      </button>
    </div>
  );
};

export default CoverImageUploader;

