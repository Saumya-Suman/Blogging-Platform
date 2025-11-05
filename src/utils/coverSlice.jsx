import { createSlice } from "@reduxjs/toolkit";

const storySlice = createSlice({
  name: "story",
  initialState: {
    title: "",
    content: "",
    imageUrl: "",
    previewVisible: false,
    showUploader: false,
    activeTab: "upload",
  },

  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setContent: (state, action) => {
      state.content = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
      // When switching tabs, reset preview visibility if needed
      if (action.payload === "url") {
        state.previewVisible = false;
        state.imageUrl = "";
      }
    },

    setCoverImage: (state, action) => {
      (state.imageUrl = action.payload), (state.previewVisible = true);
    },
    removeCoverImage: (state) => {
      state.imageUrl = "";
      state.previewVisible = false;
      state.showUploader = false;
    },
    setShowUploader: (state, action) => {
      state.showUploader = action.payload;
    },

    setImageFromUrl: (state, action) => {
      state.imageUrl = action.payload;
      state.previewVisible = true;
    },

    discardStory: (state) => {
      state.title = "";
      state.content = "";
      state.showUploader = false;
      state.imageUrl = "";
    },
  },
});
export const {
  setTitle,
  setContent,
  setActiveTab,
  setCoverImage,
  removeCoverImage,
  setShowUploader,
  setImageFromUrl,
  discardStory,
} = storySlice.actions;
export default storySlice.reducer;
