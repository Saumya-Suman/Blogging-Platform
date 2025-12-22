import { useRef } from "react";
import { useState } from "react";
import { checkValidData } from "../utils/validate";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const SignIn = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("logIn");
  const [error, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  //craete reference and Now I want to refer my input box these references.
  //this will help us to get the reference of input box.
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = async () => {
    const message = checkValidData(email.current.value, password.current.value);

    setErrorMessage(message);
    if (message) return;

    try {
      if (activeTab === "signUp") {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.current.value, // ✅ FIX
          password.current.value // ✅ FIX
        );

        await updateProfile(userCredential.user, {
          displayName: name.current.value, // ✅ FIX
        });
        dispatch(
          addUser({
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            displayName: name.current.value,
          })
        );
      } else {
        await signInWithEmailAndPassword(
          auth,
          email.current.value, // ✅ FIX
          password.current.value // ✅ FIX
        );
      }

      onClose();
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center p-10 border">
      <div className="bg-white border border-gray-300 rounded-xl shadow-xl max-w-md w-full p-6">
        <button
          className="w-full flex justify-end cursor-pointer"
          onClick={onClose}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/2976/2976286.png"
            alt="closing-form"
            className="w-2 h-2"
          />
        </button>
        <h1 className="text-lg font-semibold ">Welcome to BlogSpace</h1>
        <h2 className="text-sm text-gray-500 my-3">
          Sign in to start writing and engaging with posts
        </h2>
        <div className="bg-gray-100 rounded-lg flex justify-between px-2 py-2 shadow-sm my-4">
          <button
            className={`flex-1 py-2 rounded-lg ${
              activeTab === "logIn" ? "bg-white font-semibold" : ""
            }`}
            onClick={() => setActiveTab("logIn")}
          >
            Log In
          </button>
          <button
            className={`flex-1 py-2 rounded-lg ${
              activeTab === "signUp" ? "bg-white font-semibold" : ""
            }`}
            onClick={() => setActiveTab("signUp")}
          >
            Sign Up
          </button>
        </div>
        <form
          className="flex flex-col space-y-3"
          onSubmit={(e) => e.preventDefault()}
        >
          {activeTab === "signUp" && (
            <div className="space-x-3">
              <label className="block">Name</label>
              <input
                ref={name}
                type="name"
                placeholder="Enter your name"
                className="my-3 bg-gray-200 px-4 py-2 rounded-md"
              />
            </div>
          )}
          <div className="space-x-3">
            <label className="block">Email</label>
            <input
              ref={email}
              type="email"
              placeholder="Enter your email"
              className="my-3 bg-gray-200 px-4 py-2 rounded-md"
            />
          </div>
          <div className="space-x-3">
            <label className="block">Password</label>
            <input
              ref={password}
              type="password"
              placeholder="Enter your password"
              className="my-3 bg-gray-200 px-4 py-2 rounded-md"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button type="button" onClick={handleButtonClick}>
            {activeTab === "logIn" ? "Log In" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default SignIn;
