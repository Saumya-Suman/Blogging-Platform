import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BlogFeed from "./components/BlogFeed.jsx";
import appStore from "./utils/appStore.jsx";
import { Provider } from "react-redux";
import BlogSpace from "./components/BlogSpace.jsx";
import CreateBlog from "./components/CreateBlog.jsx";
import BlogDetails from "./components/BlogDetails.jsx";
import DraftEditor from "./components/DraftEditor.jsx";
import { useNavigate } from "react-router-dom";


export const DraftEditorWrapper = () => {
  const navigate = useNavigate();
  return <DraftEditor onClose={() => navigate("/")} />;
};

const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />, //Parent layout
    children: [
      {
        path: "/",
        element: <BlogFeed />,
      },
      {
        path: "blogSpace",
        element: <BlogSpace />,
      },
      {
        path: "create-blog",
        element: <CreateBlog />,
      },
      {
        path: "postdetails/:id",
        element: <BlogDetails />,
      },
      {
        path: "draft/:id",
        element: <DraftEditorWrapper />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={appStore}>
    <RouterProvider router={mainRouter} />
  </Provider>
);
