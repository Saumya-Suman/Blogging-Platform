import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import SignIn from "./components/SignIn";
import { useState } from "react";
import CreateNewHeader from "./components/CreateNewHeader";
import { useNavigate } from "react-router-dom";
import DraftPopUp from "./components/DraftPopUp";

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const handleSignIn = () => {
    setShowForm(!showForm);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };
  // Route checks
  const isCreateBlogPage = location.pathname === "/create-blog";
  const isDraftPage = location.pathname.startsWith("/draft/");

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
