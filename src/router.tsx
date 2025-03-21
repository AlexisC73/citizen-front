import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import DefaultLayout from "./layout/default_layout";
import SigninPage from "./pages/auth/signin_page";
import AuthLayout from "./layout/auth_layout";
import SignupPage from "./pages/auth/signup_page";

export const createRouter = () =>
  createBrowserRouter([
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "/auth",
          element: <SigninPage />,
        },
        {
          path: "/auth/signup",
          element: <SignupPage />,
        },
      ],
    },
    {
      path: "/",
      element: <DefaultLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
  ]);
