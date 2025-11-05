import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPosts } from "../utils/blogPostSlice";

const useBlogPosts = () => {
  const dispatch = useDispatch();

  const getBlogDetails = async () => {
    try {
      const response = await fetch(
        "https://68fa0bd8ef8b2e621e7e8f95.mockapi.io/blogposts"
      );
      const json = await response.json();
      console.log(json);

      if (Array.isArray(json)) {
         dispatch(addPosts(json));
      } else {
        dispatch(addPosts(json));
      }
    } catch (error) {
      console.error("Error fetching blog details:", error);
    }
  };

  useEffect(() => {
    getBlogDetails();
  }, []);
};
export default useBlogPosts;
