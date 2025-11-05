import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
     uid: null,
    email: null,
    displayName: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
    },
    deleteUser: (state) => {
      state.uid = null;
      state.email = null;
      state.displayName = null;
    },
  },
});

export const { addUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
