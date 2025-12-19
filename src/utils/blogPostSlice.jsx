import { createSlice } from "@reduxjs/toolkit";

const blogPostSlice = createSlice({
  name: "posts",
  initialState: { posts: [] },
  reducers: {
    addPost: (state, action) => {
      state.posts.unshift(action.payload); // ✅ now it's array
    },
    addPosts: (state, action) => {
      state.posts = action.payload; // replace array
    },
    //filter() returns a new array without the deleted post
    deletePost: (state, action) => {
      return state.posts.filter((post) => post.id !== action.payload);
    },

    // updatePost is helpful for likes/comments.

    updatePost: (state, action) => {
      const { id, ...updates } = action.payload;
      const index = state.posts.findIndex((p) => p.id === id);
      if (index !== -1) {
        state.posts[index] = { ...state.posts[index], ...updates };
      }
    },

    updateLikes: (state, action) => {
      const { id, likes } = action.payload;
      const post = state.posts.find((p) => p.id === id);
      if (post) post.likes = likes;
    },
    updateDislikes: (state, action) => {
      const { id, dislikes } = action.payload;
      const post = state.posts.find((p) => p.id === id);
      if (post) post.dislikes = dislikes;
    },
    updateComments: (state, action) => {
      const { id, comments } = action.payload;
      const post = state.posts.find((p) => p.id === id);
      if (post) post.comments = comments;
    },
  },
});

export const {
  addPosts,
  addPost,
  deletePost,
  updatePost,
  updateLikes,
  updateDislikes,
  updateComments,
} = blogPostSlice.actions;

export default blogPostSlice.reducer;
