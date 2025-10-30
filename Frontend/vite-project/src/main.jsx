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
import SingleTweet from "./pages/tweet/SingleTweet.jsx";
import AllComments from "./pages/comments/AllComments.jsx";
import CreateComment from "./pages/comments/CreateComment.jsx";
import UpdateComment from "./pages/comments/UpdateComment.jsx";
import TweetComments from "./pages/comments/TweetComments.jsx";
import DeleteComment from "./pages/comments/DeleteComment.jsx";
import SingleComment from "./pages/comments/SingleComment.jsx";
import FollowUser from "./pages/subscription/FollowUser.jsx";
import UnfollowUser from "./pages/subscription/UnfollowUser.jsx";
import GetFollowers from "./pages/subscription/GetFollowers.jsx";
import GetFollowing from "./pages/subscription/GetFollowing.jsx";
import TweetLike from "./pages/like/TweetLike.jsx";
import CommentLike from "./pages/like/CommentLike.jsx";
import GetLikedTweets from "./pages/like/GetLikeTweet.jsx";

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
        path: "tweet/:tweetId",
        element: <SingleTweet />,
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

      //comments
      {
        path: "comment/:tweetId",
        element: <TweetComments />,
      },
      {
        path: "comment/create/:tweetId",
        element: <CreateComment />,
      },
      {
        path: "comment/c/:commentId",
        element: <SingleComment />,
      },
      {
        path: "comment/update/:commentId",
        element: <UpdateComment />,
      },
      {
        path: "comment/delete/:commentId",
        element: <DeleteComment />,
      },

      //follow routes
      {
        path: "follow/:userId",
        element: <FollowUser />,
      },
      {
        path: "unfollow/:userId",
        element: <UnfollowUser />,
      },
      {
        path: "follower/:userId",
        element: <GetFollowers />,
      },
      {
        path: "following/:userId",
        element: <GetFollowing />,
      },

      //like route
      {
        path: "like/tweet/:tweetId",
        element: <TweetLike />,
      },
      {
        path: "like/comment/:commentId",
        element: <CommentLike />,
      },
      {
        path: "like/tweet",
        element: <GetLikedTweets />,
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
