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
        path: "current-user",
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
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </StrictMode>
);
