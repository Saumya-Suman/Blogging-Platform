import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import SignIn from "./components/SignIn";
import { useState } from "react";
import CreateNewHeader from "./components/CreateNewHeader";
import { useNavigate } from "react-router-dom";
import DraftPopUp from "./components/DraftPopUp";
import { useEffect} from "react";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { addUser, deleteUser } from "./utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = () => {
    setShowForm(!showForm);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };
  // Route checks
  const isCreateBlogPage = location.pathname === "/create-blog";
  const isDraftPage = location.pathname.startsWith("/draft/");

   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
      } else {
        dispatch(deleteUser());
        navigate("/");
      }
    });

    //Unsubscribe when component unmount --REMOVED
    return () => unsubscribe();
  }, []);

  return (
    <div className="app ">
      {!isDraftPage &&
        (isCreateBlogPage ? (
          <CreateNewHeader onClose={() => navigate("/")} />
        ) : (
          <Header onSignInClick={handleSignIn} />
        ))}

      {showForm && <SignIn onClose={handleCloseForm} />}
      <DraftPopUp />
      <Outlet />
    </div>
  );
};
export default App;
