import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import blogPostReducer from './blogPostSlice'
import storyReducer from './coverSlice';


const appStore = configureStore({
    reducer:{
        user: userReducer,
        posts: blogPostReducer,
        story: storyReducer,

    }
}
)

export default appStore;