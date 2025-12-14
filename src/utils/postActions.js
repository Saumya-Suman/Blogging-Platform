import { doc, updateDoc, increment, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../firebase";

export const toggleLike = async (postId, userId, hasLiked, hasDisliked) => {
  const ref = doc(db, "posts", postId);

  // If already liked → remove like
  if (hasLiked) {
    return updateDoc(ref, {
      likes: increment(-1),
      likedBy: arrayRemove(userId),
    });
  }

  // Add like (and remove dislike if exists)
  const updateData = {
    likes: increment(1),
    likedBy: arrayUnion(userId),
  };

  if (hasDisliked) {
    updateData.dislikes = increment(-1);
    updateData.dislikedBy = arrayRemove(userId);
  }

  return updateDoc(ref, updateData);
};


/**
 * ------------------------------------------------------------------
 *  DISLIKE TOGGLE LOGIC
 *  - Agar DISLIKE already hai → Remove Dislike
 *  - Agar DISLIKE nahi hai → Add Dislike
 *  - Agar user ne Like pehle kiya tha → Like auto-remove
 * ------------------------------------------------------------------
 */
export const toggleDislike = async (postId, userId, hasDisliked, hasLiked) => {
  const ref = doc(db, "posts", postId);

  // If already disliked → remove dislike
  if (hasDisliked) {
    return updateDoc(ref, {
      dislikes: increment(-1),
      dislikedBy: arrayRemove(userId),
    });
  }

  // Add dislike (and remove like if exists)
  const updateData = {
    dislikes: increment(1),
    dislikedBy: arrayUnion(userId),
  };

  if (hasLiked) {
    updateData.likes = increment(-1);
    updateData.likedBy = arrayRemove(userId);
  }

  return updateDoc(ref, updateData);
};
