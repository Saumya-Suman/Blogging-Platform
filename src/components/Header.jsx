import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, deleteUser } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";

const Header = ({ onSignInClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user); //get user from redux.

  const handleSignOut = () => {
    //take signOut implementation from signOut.
    signOut(auth)
      .then(() => {
        navigate("/")
      })
      .catch(() => {
        console.log("error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
      } else {
        dispatch(deleteUser()); 
      }
    });

    //Unsubscribe when component unmount --REMOVED
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex justify-between items-center px-8 py-4 shadow-md">
      {}
      <h1 className="ml-70 text-2xl">BlogSpace</h1>
      {user && user.uid ? (
        <div className="">
          <button
            className="text-white bg-black rounded-lg px-3 py-1 mr-40"
            onClick={() => navigate("/create-blog")}
          >
            🖋️ Write
          </button>
          <button
            className="text-white bg-black rounded-lg px-3 py-1 mr-70"
            onClick={handleSignOut}
          >
            SignOut
          </button>
        </div>
      ) : (
        <button
          className="text-white bg-black rounded-lg px-3 py-1 mr-70"
          onClick={onSignInClick}
        >
          SignIn
        </button>
      )}
    </div>
  );
};
export default Header;
