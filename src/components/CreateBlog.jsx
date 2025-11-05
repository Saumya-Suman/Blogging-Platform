import { useDispatch, useSelector } from "react-redux";
import { setTitle, setContent, discardStory } from "../utils/coverSlice";
import { setShowUploader, removeCoverImage } from "../utils/coverSlice";
import CoverImageUploader from "./CoverImageUploader";

const CreateBlog = () => {
  const dispatch = useDispatch();
  const { title, content } = useSelector((state) => state.story);
  const { showUploader} = useSelector(
    (state) => state.story
  );
  const isPublishDisabled = !title.trim() || !content.trim();

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
            {/* Default view of cover image  */}
            {!showUploader ? (
              <div
                className="border-2 border-dashed rounded-xl w-full h-[20vh] hover:bg-gray-200/30 mb-8 flex items-center justify-center cursor-pointer"
                onClick={() => dispatch(setShowUploader(true))}
              >
                <div className="">
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
            onClick={() => {
              dispatch(discardStory());
              dispatch(removeCoverImage());
            }}
          >
            🗄️ Discard
          </button>

          <button
            disabled={isPublishDisabled}
            className={`px-5 py-2 mr-80 shadow-md rounded-md ${
              isPublishDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            🌟 Publish Story
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
