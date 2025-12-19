import { useSelector } from "react-redux";
import BlogPost from "./BlogPost";
import useBlogPosts from "../utils/useBlogPosts";

//map through posts and render BlogPost component for each post.
const BlogFeed = () => {
  useBlogPosts();
  const Posts = useSelector((store) => store.posts.posts);
  
 return (
    <div className="">
      {Posts && Posts.length > 0 ? (
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



