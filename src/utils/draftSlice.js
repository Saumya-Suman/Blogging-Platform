import { createSlice } from "@reduxjs/toolkit";

const draftSlice = createSlice({
  name: "draft",
  initialState: {
    draftId: null,
    showPopup: false,
    popupType: "",
  },
  reducers: {
    setDraftId: (state, action) => {
      state.draftId = action.payload;
    },
    setShowPopup: (state, action) => {
      state.showPopup = action.payload;
    },
    setPopupType: (state, action) => {
      state.popupType = action.payload;
    },
  },
});

export const { setDraftId, setShowPopup, setPopupType } = draftSlice.actions;
export default draftSlice.reducer;
