import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Signup from "./pages/user/Signup.jsx";
import Login from "./pages/user/Login.jsx";
import Logout from "./pages/user/Logout.jsx";
import CurrentUser from "./pages/user/CurrentUser.jsx";
import UpdateAccount from "./pages/user/UpdateAccount.jsx";
import UpdateAvatar from "./pages/user/UpdateAvatar.jsx";
import ChangePassword from "./pages/user/ChangePassword.jsx";
import AllTweets from "./pages/tweet/AllTweets.jsx";
import CreateTweet from "./pages/tweet/CreateTweet.jsx";
import GetUserTweet from "./pages/tweet/GetUserTweet.jsx";
import UpdateTweet from "./pages/tweet/UpdateTweet.jsx";
import DeleteTweet from "./pages/tweet/DeleteTweet.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "log-out",
        element: <Logout />,
      },
      {
        path: "user/current-user",
        element: <CurrentUser />,
      },
      {
        path: "user/update",
        element: <UpdateAccount />,
      },
      {
        path: "user/update/avatar",
        element: <UpdateAvatar />,
      },
      {
        path: "user/update/password",
        element: <ChangePassword />,
      },

      //tweets routes
      {
        path: "tweet",
        element: <AllTweets />,
      },
      {
        path: "tweet/create",
        element: <CreateTweet />,
      },
      {
        path: "tweet/:userId",
        element: <GetUserTweet />,
      },
      {
        path: "tweet/update/:tweetId",
        element: <UpdateTweet />,
      },
      {
        path: "tweet/delete/:tweetId",
        element: <DeleteTweet />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </StrictMode>
);
