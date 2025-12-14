import { useDispatch, useSelector } from "react-redux";
import {
  setTitle,
  setContent,
  setShowUploader,
  removeCoverImage,
} from "../utils/coverSlice";
import { addPost } from "../utils/blogPostSlice";
import CoverImageUploader from "./CoverImageUploader";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImageToCloudinary } from "../utils/uploadImageToCloudinary";
import DraftPopUp from "./DraftPopUp";

const CreateBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ also get imageFile
  const { title, content, imageUrl, imageFile } = useSelector(
    (state) => state.story
  );
  const { showUploader } = useSelector((state) => state.story);

  const [publishing, setPublishing] = useState(false);

  const isPublishEnabled =
    title.trim() && content.trim() && (imageUrl || imageFile);

  // ✅ Publish blog to Firestore
  const handlePublish = async () => {
    if (!isPublishEnabled) return;
    setPublishing(true);

    try {
      let finalImageUrl = "";

      // Upload to Cloudinary instead of Firebase Storage
      if (imageFile) {
        finalImageUrl = await uploadImageToCloudinary(imageFile);
      } else {
        finalImageUrl = imageUrl || "";
      }

      //  Create post object
      const postData = {
        title,
        description: content.slice(0, 200),
        content,
        image: finalImageUrl,
        author: "Anonymous",
        createdAt: serverTimestamp(),
        likes: 0,
        comments: [],
      };

      //Save post in Firestore

      const docRef = await addDoc(collection(db, "posts"), postData);
      console.log("✅ Firestore document added:", docRef.id);
      dispatch(addPost({ id: docRef.id, ...postData }));

      dispatch(setTitle(""));
      dispatch(setContent(""));
      dispatch(removeCoverImage());
      dispatch(setShowUploader(false));
      navigate("/blogSpace");
    } catch (err) {
      console.error("Publish failed:", err);
      alert("Publish failed. Check console for details.");
    } finally {
      setPublishing(false);
    }
  };

  const handleDiscard = () => {
    if (window.confirm("Are you sure you want to discard the story?")) {
      dispatch(setTitle(""));
      dispatch(setContent(""));
      dispatch(removeCoverImage());
      dispatch(setShowUploader(false));
    }
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="text-gray-500 max-w-5xl mx-auto my-10 px-8 py-8 border border-black/10 rounded-lg h-full shadow-md">
          {/* TITLE */}
          <div className="pb-4 my-8 border-b border-black/10">
            <label className="block uppercase">TITLE</label>
            <input
              type="text"
              value={title}
              placeholder="Enter your story title..."
              className="text-5xl w-full outline-none"
              onChange={(e) => dispatch(setTitle(e.target.value))}
            />
          </div>

          {/* COVER IMAGE */}
          <div className="pb-4 my-8 border-b border-black/10">
            <label className="">COVER IMAGE</label>
            {!showUploader ? (
              <div
                className="border-2 border-dashed rounded-xl w-full h-[20vh] hover:bg-gray-200/30 mb-8 flex items-center justify-center cursor-pointer"
                onClick={() => dispatch(setShowUploader(true))}
              >
                <div>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/9720/9720850.png"
                    alt="file-image"
                    className="mx-auto border-2 border-solid border-gray-300 rounded-full w-16 h-16 bg-gray-100 p-2"
                  />
                  <p className="text-black font-medium">Add Cover Image</p>
                  <p className="text-gray-500">Upload from device or add URL</p>
                </div>
              </div>
            ) : (
              <CoverImageUploader />
            )}
          </div>

          {/* STORY */}
          <div className="min-h-[500px]">
            <label className="block">STORY</label>
            <textarea
              value={content}
              placeholder="Start writing your story..."
              onChange={(e) => dispatch(setContent(e.target.value))}
              className="w-full min-h-[400px] p-2 border rounded-md outline-none"
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-between mb-40">
          <button
            className="ml-80 shadow-md px-4 py-2 hover:bg-gray-200/30 rounded-md"
            onClick={handleDiscard}
          >
            🗄️ Discard
          </button>
          <button
            disabled={!isPublishEnabled || publishing}
            className={`px-5 py-2 mr-80 shadow-md rounded-md ${
              isPublishEnabled
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
            onClick={handlePublish}
          >
            {publishing ? "Publishing..." : "🌟 Publish Story"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
