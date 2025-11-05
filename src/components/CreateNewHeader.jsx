const CreateNewHeader = ({onClose}) => {
  return (
    <div className="flex justify-between px-8 py-4 shadow-md">
      <h1 className="text-xl ml-70">Create New Story</h1>
      <div className="flex mr-60 gap-6">
        <button className="shadow-md cursor-pointer px-6 rounded-md ">
          🗂️ Save Draft
        </button>
        <img
          src="https://cdn-icons-png.flaticon.com/128/2976/2976286.png"
          alt="closing-form"
          className="w-2 h-2 my-3"
          onClick={onClose}
        />
      </div> 
    </div>
  );
};
export default CreateNewHeader;
