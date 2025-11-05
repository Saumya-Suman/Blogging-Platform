import { createSlice } from "@reduxjs/toolkit";

const blogPostSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    addPosts: (state, action) => action.payload,
    addPost: (state,action) => {
       state.push(action.payload);
    },
     deletePost: (state, action) => {
      return state.filter((post) => post.id !== action.payload);
    }
  },
  
});

export const {addPosts, addPost, deletePost} = blogPostSlice.actions;

export default blogPostSlice.reducer;
