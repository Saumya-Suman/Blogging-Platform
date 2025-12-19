// for single post
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toggleLike, toggleDislike } from "../utils/postActions";
import { useSelector } from "react-redux";

const BlogPost = ({ post }) => {
  const user = useSelector((store) => store.user);
  const userId = user?.uid;
  const isLoggedIn = !!userId;
  const navigate = useNavigate();

  // --- Local state for UI updates ---
  const [likes, setLikes] = useState(post.likes || 0);
  const [dislikes, setDislikes] = useState(post.dislikes || 0);
  const [loading, setLoading] = useState(false);

  // Check from Firestore arrays if user has liked/disliked
  const hasLiked = post.likedBy?.includes(userId) ?? false;
  const hasDisliked = post.dislikedBy?.includes(userId) ?? false;

  const handleLike = async () => {
    if (!isLoggedIn || loading) return;
    setLoading(true);

    await toggleLike(post.id, userId, hasLiked, hasDisliked);

    // Optimistic UI update
    if (hasLiked) {
      setLikes((prev) => prev - 1);
    } else {
      setLikes((prev) => prev + 1);
      if (hasDisliked) setDislikes((prev) => prev - 1);
    }

    setLoading(false);
  };

  const handleDislike = async () => {
    if (!isLoggedIn || loading) return;
    setLoading(true);

    await toggleDislike(post.id, userId, hasDisliked, hasLiked);

    // Optimistic UI update
    if (hasDisliked) {
      setDislikes((prev) => prev - 1);
    } else {
      setDislikes((prev) => prev + 1);
      if (hasLiked) setLikes((prev) => prev - 1);
    }

    setLoading(false);
  };

  const handleComment = () => {
    navigate(`/postdetails/${post.id}`);
  };

  return ( 
    <div className="p-0">
      <div className="flex max-w-3xl mx-auto border-b border-gray-300 py-8 px-4 gap-6 ">
        {/* Left Container */}
        <div className="w-full sm:w-[584px] ">
          {/* Author & Date */}
          <div className="mb-2 sm:mb-3 text-sm">
            <span className="font-semibold">
              {post.authorName || "Anonymous"}
            </span>
            <span className="px-2">•</span>
            <span className="text-zinc-500">
              {post.createdAt?.toDate
                ? post.createdAt.toDate().toLocaleString()
                : post.date || ""}
            </span>
          </div>
          <Link to={`/postdetails/${post.id}`}>
            {/* Title */}
            <h2 className="mb-2 sm:mb-3 text-base sm:text-lg font-semibold">{post.title}</h2>

            {/* Summary */}
            <p className="text-zinc-500 mb-3 sm:mb-4 text-sm">{post.description}</p>
          </Link>

          {/* like , dislike , comments section */}
          <div className="flex items-center gap-4 sm:gap-6 mt-2 sm:mt-3 text-sm">
            <button
              onClick={handleLike}
              disabled={!isLoggedIn || loading} // login nahi hai to button click hi nahi hoga // disabled
              className={`flex items-center gap-1 transition
    ${
      isLoggedIn
        ? "text-gray-500 hover:text-gray-900"
        : "text-gray-400 opacity-50 cursor-not-allowed"
    }`}
            >
              👍 <span>{likes}</span>
            </button>

            <button
              onClick={handleDislike}
              disabled={!isLoggedIn || loading} // login nahi hai to button click hi nahi hoga // disabled
              className={`flex items-center gap-1 transition
    ${
      isLoggedIn
        ? "text-gray-500 hover:text-gray-900"
        : "text-gray-400 opacity-50 cursor-not-allowed"
    }`}
            >
              👎 <span>{dislikes}</span>
            </button>

            <button
              onClick={handleComment}
              className="flex items-center gap-1 text-gray-500 hover:text-gray-900 "
            >
              💬 <span>{post.commentCount || 0}</span>
            </button>
          </div>
        </div>

        {/* Right Image */}
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-32 h-32 rounded-lg object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default BlogPost;
