// CreateNewHeader.jsx
import { useSelector, useDispatch } from "react-redux";
import { setDraftId, setShowPopup } from "../utils/draftSlice";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { uploadImageToCloudinary } from "../utils/uploadImageToCloudinary";
import { setPopupType } from "../utils/draftSlice";

const CreateNewHeader = ({ onClose }) => {
  const { title, content, imageUrl, imageFile } = useSelector(
    (state) => state.story
  );
  const isSaveEnabled = title.trim().length > 0;
  const dispatch = useDispatch();

  const handleSaveDraft = async () => {
    try {
      let finalImageUrl = "";

      if (imageFile) {
        finalImageUrl = await uploadImageToCloudinary(imageFile);
      } else {
        finalImageUrl = imageUrl || "";
      }

      const draftData = {
        title,
        content,
        image: finalImageUrl,
        status: "draft",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "drafts"), draftData);

      // store id & show popup
      dispatch(setDraftId(docRef.id));
      dispatch(setPopupType("save"));
      dispatch(setShowPopup(true));
    } catch (err) {
      console.error("Draft save failed:", err);
    }
  };

  return (
    <div className="w-full shadow-md">
      <div className="max-w-6xl mx-auto flex sm:flex-row items-center justify-between px-2 py-4 sm:px-8 sm:py-4 ">
        <h1 className="text-lg sm:text-2xl">Create New Story</h1>
         <div className="flex items-center gap-3 sm:mx-4 justify-between">
          <img
            src="https://cdn-icons-png.flaticon.com/128/2976/2976286.png"
            alt="closing-form"
            className="w-3 h-3 cursor-pointer"
            onClick={onClose}
          />
          <button
            className={`shadow-md cursor-pointer items-center px-2 py-2 rounded-md ${
              isSaveEnabled
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            onClick={handleSaveDraft}
            disabled={!isSaveEnabled}
          >
            💾 Save Draft
          </button>
          </div>
      </div>
    </div>
  );
};

export default CreateNewHeader;
