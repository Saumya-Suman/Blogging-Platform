import { useSelector } from "react-redux";
import BlogPost from "./BlogPost";
import useBlogPosts from "../utils/useBlogPosts";
import SignIn from "./SignIn";

const BlogFeed = () => {
  useBlogPosts();
  const Posts = useSelector((store) => store.posts);

  return (
    <div className="max-w-4xl mx-auto ">
      {Posts.length > 0 ? (
        Posts.map((post, index) => (
          <BlogPost
            key={post.id  || index }
            post={post}
          />
        ))
      ) : (
        <p>Loading posts...</p>
      )}
    </div>
  );
};

export default BlogFeed;

