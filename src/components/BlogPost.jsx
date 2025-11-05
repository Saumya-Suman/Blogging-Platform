import SignIn from "./SignIn";

const BlogPost = ({ post }) => {
  return (
    <div className="">
      <div className="flex border-b border-gray-500 py-6 m-0">
        {/* Left Container */}
        <div className="">
          {/* Author & Date */}
          <div className="mb-3">
            <span className="font-semibold">{post.author}</span>
            <span className="px-3">•</span>
            <span className="text-zinc-500">{post.date}</span>
          </div>

          {/* Title */}
          <h2 className="mb-3 text-l">{post.title}</h2>

          {/* Summary */}
          <p className="text-zinc-500 mb-4 ">{post.description}</p>

          {/* Likes & Comments */}
          <div className="text-sm text-gray-500">
            <span className="">👍 {post.likes} 👎🏻</span>
            <span className="ml-5">💬 {post.comments}</span>
          </div>
        </div>

        {/* Right Image */}
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-30 h-30 rounded-lg "
          />
        )}
      </div>
    </div>
  );
};

export default BlogPost;
