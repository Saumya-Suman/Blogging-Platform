import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./components/SignIn.jsx";
import BlogFeed from "./components/BlogFeed.jsx";
import appStore from "./utils/appStore.jsx";
import { Provider } from "react-redux";
import BlogSpace from "./components/BlogSpace.jsx";
import CreateBlog from "./components/CreateBlog.jsx";



const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />, //Parent layout
    children: [
      {
        path:'/',
        element:<BlogFeed />
      },
       {
        path:'blogSpace',
        element: <BlogSpace />,
      },
      {
        path:'create-blog',
        element:<CreateBlog />
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={appStore}>
 <RouterProvider router={mainRouter} />
  </Provider>
);

