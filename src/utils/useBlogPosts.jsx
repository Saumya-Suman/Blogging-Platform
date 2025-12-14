import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPosts } from "./blogPostSlice";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const useBlogPosts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // collection name `posts`
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const posts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(addPosts(posts));
      },
      (err) => {
        console.error("Realtime posts error:", err);
      }
    );

    return () => unsubscribe();
  }, [dispatch]);
};

export default useBlogPosts;
