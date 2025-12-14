import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import blogPostReducer from "./blogPostSlice";
import storyReducer from "./coverSlice";
import draftReducer from "./draftSlice";

const appStore = configureStore({
  reducer: {
    posts: blogPostReducer,
    story: storyReducer,
    user: userReducer,
    draft: draftReducer

  },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // 👈 fixes "non-serializable File" warning
      }),
});

export default appStore;
