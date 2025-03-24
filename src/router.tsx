import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import DefaultLayout from "./layout/default_layout";
import { SigninPage } from "./pages/auth/signin_page";
import AuthLayout from "./layout/auth_layout";
import OrganizationsListPage from "./pages/organizations/list";
import { SignupPage } from "./pages/auth/signup_page";
import { RequireGuest } from "./layout/middleware/require_guest";
import { RequireAuth } from "./layout/middleware/require_auth";
import { ManageOrganizationPage } from "./pages/organizations/manage";

export const createRouter = () =>
  createBrowserRouter([
    {
      path: "/auth",
      element: (
        <RequireGuest>
          <AuthLayout />
        </RequireGuest>
      ),
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
      element: (
        <RequireAuth>
          <DefaultLayout />
        </RequireAuth>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/organizations/list",
          element: <OrganizationsListPage />,
        },
        {
          path: "/organizations/manage",
          element: <ManageOrganizationPage />,
        },
      ],
    },
  ]);
