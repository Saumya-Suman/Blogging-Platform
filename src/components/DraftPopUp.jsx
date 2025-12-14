import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setShowPopup } from "../utils/draftSlice";

const DraftPopUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showPopup, draftId, popupType } = useSelector((state) => state.draft);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[400px] text-center">
        <h2 className="text-xl font-bold mb-4">
          {popupType === "delete"
            ? "Draft Deleted Successfully!"
            : "Draft Saved Successfully!"}
        </h2>

        {popupType !== "delete" && (
          <button
            onClick={() => {
              dispatch(setShowPopup(false));
              navigate(`/draft/${draftId}`);
            }}
            className="w-full bg-blue-500 text-white py-2 rounded-md mb-3"
          >
            Open save Draft
          </button>
        )}

        {popupType !== "delete" && (
          <button
            onClick={() => {
              dispatch(setShowPopup(false));
              navigate("/create-blog");
            }}
            className="w-full bg-gray-200 py-2 rounded-md"
          >
            Create New Blog
          </button>
        )}
      </div>
    </div>
  );
};

export default DraftPopUp;
