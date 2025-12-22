import CreateBlog from "./CreateBlog";
import { useSelector, useDispatch } from "react-redux";
import { setShowPopup, setPopupType } from "../utils/draftSlice";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { resetStory } from "../utils/coverSlice";
import { setDraftId } from "../utils/draftSlice";

const DraftEditor = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { title } = useSelector((state) => state.story);
  const draftId = useSelector((state) => state.draft.draftId);

  const isDeleteEnabled = title.trim().length > 0;

  const handleDeleteDraft = async () => {
    if (!draftId) {
      alert("Draft ID missing!");
      return;
    }

    try {
      await deleteDoc(doc(db, "drafts", draftId));

      // SHOW POPUP
      dispatch(setPopupType("delete"));
      dispatch(setShowPopup(true));

      // navigate after delay
      setTimeout(() => {
      dispatch(resetStory());
       dispatch(setDraftId(null)); 
      dispatch(setShowPopup(false));   // popup hide
      navigate("/create-blog");    
      }, 1500);

    } catch (err) {
      console.error("Failed to delete draft:", err);
    }
  };

  return (
    <div className="">
      <div className="w-full shadow-md">
      <div className="max-w-6xl mx-auto flex sm:flex-row items-center justify-between px-2 py-4 sm:px-8 sm:py-4">
        <h1 className="text-xl sm:text-2xl ">Editing Draft</h1>

        <div className="flex items-center gap-3 sm:mx-4 justify-between">
          <img
            src="https://cdn-icons-png.flaticon.com/128/2976/2976286.png"
            alt="closing-form"
            className="w-3 h-3 cursor-pointer"
            onClick={onClose}
          />

          <button
            className={`shadow-md cursor-pointer items-center px-2 py-2 rounded-md ${
              isDeleteEnabled
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            onClick={handleDeleteDraft}
            disabled={!isDeleteEnabled}
          >
            🗑 Delete Draft
          </button>
        </div>
        </div>
      </div>
      <CreateBlog />
    </div>
  
  );
};

export default DraftEditor;

