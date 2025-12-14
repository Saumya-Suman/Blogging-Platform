// for single post
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toggleLike, toggleDislike } from "../utils/postActions";
import { auth } from "../firebase";

const BlogPost = ({ post }) => {
    const userId = auth.currentUser?.uid;
      const navigate = useNavigate();

  // --- Local state for UI updates ---
  const [hasLiked, setHasLiked] = useState(post.likedBy?.includes(userId));
  const [hasDisliked, setHasDisliked] = useState(
    post.dislikedBy?.includes(userId)
  );
  const [likes, setLikes] = useState(post.likes);
  const [dislikes, setDislikes] = useState(post.dislikes);

  const handleLike = async () => {
    await toggleLike(post.id, userId, hasLiked, hasDisliked);

    if (hasLiked) {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setHasLiked(true);

      if (hasDisliked) {
        setDislikes((prev) => prev - 1);
        setHasDisliked(false);
      }
    }
  };

  const handleDislike = async () => {
    await toggleDislike(post.id, userId, hasDisliked, hasLiked);

    if (hasDisliked) {
      setDislikes((prev) => prev - 1);
      setHasDisliked(false);
    } else {
      setDislikes((prev) => prev + 1);
      setHasDisliked(true);

      if (hasLiked) {
        setLikes((prev) => prev - 1);
        setHasLiked(false);
      }
    }
  };

  const handleComment = () => {
      navigate(`/postdetails/${post.id}`);
  };

  return (
    <div className="">
      <div className="flex border-b border-gray-500 py-6 m-0">
        {/* Left Container */}
        <div className="">
          {/* Author & Date */}
          <div className="mb-3">
            <span className="font-semibold">{post.author}</span>
            <span className="px-3">•</span>
            <span className="text-zinc-500">
              {post.createdAt?.toDate
                ? post.createdAt.toDate().toLocaleString()
                : post.date || ""}
            </span>
          </div>
          <Link to={`/postdetails/${post.id}`}>
            {/* Title */}
            <h2 className="mb-3 text-l">{post.title}</h2>

            {/* Summary */}
            <p className="text-zinc-500 mb-4 ">{post.description}</p>
          </Link>

          {/* like , dislike , comments section */}
          <div className="flex items-center gap-6 mt-3">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 ${
                hasLiked ? "text-blue-500" : "text-gray-500"
              }`}
            >
              👍 <span>{likes}</span>
            </button>

            <button
              onClick={handleDislike}
              className={`flex items-center gap-1 ${
                hasDisliked ? "text-red-500" : "text-gray-500"
              }`}
            >
              👎 <span>{dislikes}</span>
            </button>

            <button
              onClick={handleComment}
              className="flex items-center gap-1 text-gray-500"
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
            className="w-30 h-30 rounded-lg  ml-4 object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default BlogPost;
