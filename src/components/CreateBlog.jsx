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

const CreateBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ also get imageFile
  const { title, content, imageUrl, imageFile, showUploader } = useSelector(
    (state) => state.story
  );
  const user = useSelector((state) => state.user);

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
        authorId: user.uid,
        authorName: user.displayName || "Anonymous",
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
    <div className="w-full p-5 ">
      <form onSubmit={(e) => e.preventDefault()} className="mx-auto mt-6 px-4 py-6 sm:px-8 sm:py-8 max-w-3xl bg-white rounded-lg shadow-md border border-black/10">
          {/* TITLE */}
          <div className="pb-4 my-8 border-black/10 border-b">
            <label className="block uppercase">TITLE</label>
            <input
              type="text"
              value={title}
              placeholder="Enter your story title..."
              className=" w-full sm:text-5xl text-4xl font-semibold outline-none"
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
              className="w-full min-h-[400px] p-2 rounded-md outline-none"
            />
          </div>   
      </form>
         {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-around px-4 py-4 sm:px-0 sm:py-4 mb-32">
          <button
            className="px-4 py-2 rounded-md shadow-md"
            onClick={handleDiscard}
          >
            🗄️ Discard
          </button>
          <button
            disabled={!isPublishEnabled || publishing}
            className={`px-5 py-2 rounded-md shadow-md ${
              isPublishEnabled
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
            onClick={handlePublish}
          >
            {publishing ? "Publishing..." : "🌟 Publish Story"}
          </button>
        </div>
    </div>
  );
};

export default CreateBlog;
