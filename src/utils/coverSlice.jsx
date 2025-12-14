import { createSlice } from "@reduxjs/toolkit";

const storySlice = createSlice({
  name: "story",
  initialState: {
    title: "",
    content: "",
    imageUrl: "",
    imageFile: null,
    previewVisible: false,
    showUploader: false,
    activeTab: "upload",
    storyStatus: "draft",
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

    setImageFile: (state, action) => {
      state.imageFile = action.payload;
      state.previewVisible = true;
    },
    setImageUrl: (state, action) => {
      state.imageUrl = action.payload;
      state.previewVisible = true;
    },

    // setCoverImage: (state, action) => {
    //   state.imageUrl = action.payload.previewUrl;
    //   state.imageFile = action.payload.file;
    //   state.previewVisible = true;
    // },
    removeCoverImage: (state) => {
      state.imageUrl = "";
      state.imageFile = null;
      state.previewVisible = false;
      state.showUploader = false;
    },
    setShowUploader: (state, action) => {
      state.showUploader = action.payload;
    },

    setImageFromUrl: (state, action) => {
      state.imageUrl = action.payload;
      state.imageFile = null; // URL mode → no file
      state.previewVisible = true;
    },

    saveDraft: (state) => {
      state.storyStatus = "draft";
    },

    discardStory: (state) => {
      state.title = "";
      state.content = "";
      state.showUploader = false;
      state.imageUrl = "";
      state.previewVisible = false;
      state.storyStatus = "draft";
    },
    resetStory: (state) => {
      state.title = "";
      state.content = "";
      state.coverImage = null;
      state.showUploader = false;
    },
  },
});
export const {
  setTitle,
  setContent,
  setActiveTab,
  setImageFile,
  setImageUrl,
  removeCoverImage,
  setShowUploader,
  setImageFromUrl,
  saveDraft,
  discardStory,
  resetStory,
} = storySlice.actions;
export default storySlice.reducer;
