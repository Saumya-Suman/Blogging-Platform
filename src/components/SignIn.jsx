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

  //craete reference and Now I want to refer my input box these references.
  //this will help us to get the reference of input box.
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const dispatch = useDispatch();

  const handleButtonClick = () => {
    // console.log(email.current.value);
    // console.log(password.current.value);

    // Validate Form --
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    //If error message is present I want to return my code from here.
    if (message) return;

    //Logic of login and signUp whatever you wish to do
    //Authentication using Firebase for logIn and signUp
   if (activeTab !== "logIn") {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
           updateProfile(user, {
            displayName: name.current.value,
          })
            .then(() => {
              const { uid, email, displayName} = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
           //console.log(user); //object recieves
        })            
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "_" + errorMessage);
        });
    } else {
      //LogIn Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          alert("Login successful!");
          onClose();
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "_" + errorMessage);
        });
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center ">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 ">
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
          <button className={`flex-1 py-2 rounded-lg ${activeTab === "logIn" ? "bg-white font-semibold" : ""}`} onClick={() => setActiveTab("logIn")}>
            Log In
          </button>
          <button className={`flex-1 py-2 rounded-lg ${activeTab === "signUp" ? "bg-white font-semibold" : ""}`} onClick={() => setActiveTab("signUp")}>
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
          <p className="text-red-500 text-lg">{error}</p>
          <button type="button" onClick={handleButtonClick}>
            {activeTab === "logIn" ? "Log In" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default SignIn;

