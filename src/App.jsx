import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import SignIn from "./components/SignIn";
import { useState } from "react";
import CreateNewHeader from "./components/CreateNewHeader";

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const handleSignIn = () => {
    setShowForm(!showForm);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const isCreateBlogPage = location.pathname === "/create-blog";

  return (
    <div className="app ">
      {isCreateBlogPage ? (
        <CreateNewHeader />
      ) : (
        <Header onSignInClick={handleSignIn} />
      )}
      {showForm && <SignIn onClose={handleCloseForm} />}
      <Outlet />
    </div>
  );
};
export default App;
