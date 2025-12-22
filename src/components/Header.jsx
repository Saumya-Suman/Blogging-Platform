import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const Header = ({ onSignInClick }) => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user); //get user from redux.

  const handleSignOut = () => {
    //take signOut implementation from signOut.
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        console.log("error");
      });
  };
  return (
    <header className="w-full shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 sm:px-8 sm:py-4 px-2">
        
        {/* LEFT : LOGO */}
        <h1
          className="text-2xl font-bold cursor-pointer sm:text-2xl"
          onClick={() => navigate("/")}
        >
          BlogSpace
        </h1>

        {/* RIGHT : ACTIONS */}
        {user?.uid ? (
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => navigate("/create-blog")}
              className="bg-black text-white px-2 py-1 rounded-lg sm:px-3 sm:py-1 sm:text-base"
            >
              🖋️ Write
            </button>

            <span className="text-gray-700 font-medium sm:block hidden">
              👤 {user.displayName || "User"}
            </span>

            <button
              onClick={handleSignOut}
              className="bg-black text-white px-3 py-1 rounded-lg sm:px-3 sm:py-1 sm:text-base"
            >
              SignOut
            </button>
          </div>
        ) : (
          <button
            onClick={onSignInClick}
            className="bg-black text-white px-3 py-1 rounded-lg sm:px-3 sm:py-1 sm:text-base"
          >
            SignIn
          </button>
        )}
      </div>
    </header>
  );
};
export default Header;
