import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  increment,
} from "firebase/firestore";
import { useDispatch } from "react-redux";
import { updatePost} from "../utils/blogPostSlice";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [deleting, setDeleting] = useState(false);

  const userId = auth.currentUser?.uid;

  // Fetch single post
  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, "posts", id);
      const snap = await getDoc(docRef);
      if (snap.exists()) setPost({ id: snap.id, ...snap.data() });
    };
    fetchPost();
  }, [id]);

  // LIKE handler
  const handleLike = async () => {
    if (!userId) return alert("Please login to like the post!");
    const docRef = doc(db, "posts", id);
    const newLikes = (post.likes || 0) + 1;
    await updateDoc(docRef, { likes: newLikes });
    setPost((p) => ({ ...p, likes: newLikes }));
    dispatch(updatePost({ id, likes: newLikes }));
  };

  // ADD COMMENT handler
  const handleAddComment = async () => {
    if (!userId) return alert("Please login to comment!");
    if (!commentText.trim()) return;

    const postRef = doc(db, "posts", id);

    const newComments = [
      ...(post.comments || []),
      {
        text: commentText,
        createdAt: new Date().toISOString(),
        userId,
      },
    ];

    await updateDoc(postRef, { comments: newComments });
    await updateDoc(postRef, { commentCount: increment(1) });

    setPost((p) => ({
      ...p,
      comments: newComments,
      commentCount: (p.commentCount || 0) + 1,
    }));
    dispatch(
      updatePost({
        id,
        comments: newComments,
        commentCount: (post.commentCount || 0) + 1,
      })
    );

    setCommentText("");
  };

  // DELETE COMMENT handler
  const handleDeleteComment = async (index) => {
    //postRef kya hain ? --> Firestore me us post ka reference jisme se comment delete karna hain.
    const postRef = doc(db, "posts", id);
    //bina original array ko change kiye hue naya array banaa rahe hain jisme se specified index wala comment hata diya gaya hai.
    const newComments = [...(post.comments || [])];
    newComments.splice(index, 1);

// Firestore update
    await updateDoc(postRef, { comments: newComments });
    await updateDoc(postRef, { commentCount: increment(-1) });
    //commentCount = posts pe total kitne comments hain ?

    //this code updates the local state for immediate UI reflection and 
    // also updates the Redux store to keep the global state in sync.
    setPost((p) => ({
      ...p,
      comments: newComments,
      commentCount: (p.commentCount || 0) - 1,
    }));
    dispatch(
      updatePost({
        id,
        comments: newComments,
        commentCount: (post.commentCount || 0) - 1,
      })
    );
  };

  // DELETE BLOG handler
  //here, the delete logic is deleting the document from Firestore.
  //The additional code handles confirmation, loading state, Redux synchronization, error handling, and navigation,
  // which are essential for a good user experience and reliable application behavior.”
  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    setDeleting(true);
    try {
      const postRef = doc(db, "posts", id);
      await deleteDoc(postRef); // delete from Firestore

      // Update Redux posts list
      // dispatch(deletePost(id));

      alert("Blog deleted successfully!");
      navigate("/"); // redirect to home page
    } catch (err) {
      console.error("Failed to delete blog:", err);
      alert("Failed to delete blog. Check console for details.");
    } finally {
      setDeleting(false);
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto my-8 w-full p-5">
      {/* BACK + DELETE BUTTON */}
      <div className="flex justify-end gap-2 mb-4">
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          ← Back
        </button>

        <button
          onClick={handleDeletePost}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "🗑 Delete Blog"}
        </button>
      </div>

      <h1 className="text-3xl mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        {post.author}  {""}
        {/* //date & time */}
          {post.createdAt?.toDate ? post.createdAt.toDate().toLocaleString() : ""}  
      </p>

        <img
          src={post.image}
          alt=""
          className="w-full rounded mb-4 object-cover max-h-[400px]"
        />
    
      <div className="prose mb-6">{post.content}</div>

      {/* Like Section */}
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={handleLike}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          👍 Like ({post.likes || 0})
        </button>
      </div>

      {/* Comment Section */}
      <div>
        <h3 className="mb-2">
          Comments ({post.commentCount || post.comments?.length || 0})
        </h3>

        {/* Add Comment */}
        <div className="mb-4">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Write a comment..."
          />
          <button
            onClick={handleAddComment}
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
          >
            Add Comment
          </button>
        </div>

        {/* Comment List */}
        <div>
          {(post.comments || []).map((c, i) => (
            <div
              key={i}
              className="mb-2 border-b pb-2 flex justify-between items-start"
            >
              <div>
                <p className="text-sm">{c.text}</p>
                <p className="text-xs text-gray-400">
                  {new Date(c.createdAt).toLocaleString()}
                </p>
              </div>
              {/* Delete Comment (only by author) */}
              {c.userId === userId && (
                <button
                  onClick={() => handleDeleteComment(i)}
                  className="text-red-500 text-sm ml-2"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
