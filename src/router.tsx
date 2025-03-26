import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import DefaultLayout from "./layout/default_layout";
import { SigninPage } from "./pages/auth/signin_page";
import AuthLayout from "./layout/auth_layout";
import OrganizationsListPage from "./pages/organizations/list/list";
import { SignupPage } from "./pages/auth/signup_page";
import { RequireGuest } from "./layout/middleware/require_guest";
import { RequireAuth } from "./layout/middleware/require_auth";
import { ManageOrganizationPage } from "./pages/organizations/manage/manage";
import { AppStore } from "./store/store";
import { getAuthAsyncThunk } from "./store/auth/usecases/get-auth.usecase";
import { getMyOrganizationsUsecase } from "./store/organization/usecases/get-my-organizations.usecase";
import { getOrganizationsUsecase } from "./store/organization/usecases/get-organizations.usecase";
import { getOwnJoinRequests } from "./store/join-organization-request/usecase/get-own-join-request.usecase";
import { getOwnOrganizationJoinRequest } from "./store/join-organization-request/usecase/get-orwn-organization-join-request.usecase";

export const createRouter = ({ store }: { store: AppStore }) =>
  createBrowserRouter([
    {
      path: "/auth",
      loader: async () => {
        await store.dispatch(getAuthAsyncThunk());
      },
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
      loader: async () => {
        await store.dispatch(getAuthAsyncThunk());
        if (store.getState().auth.user) {
          await store.dispatch(getMyOrganizationsUsecase());
          await store.dispatch(getOwnJoinRequests());
        }
      },
      element: (
        <RequireAuth>
          <DefaultLayout />
        </RequireAuth>
      ),
      children: [
        {
          path: "/",
          loader: async () => {
            await store.dispatch(getMyOrganizationsUsecase());
          },
          element: <Home />,
        },
        {
          path: "/organizations/list",
          loader: async () => {
            await store.dispatch(getOrganizationsUsecase());
          },
          element: <OrganizationsListPage />,
        },
        {
          path: "/organizations/manage",
          loader: async () => {
            await store.dispatch(getOwnOrganizationJoinRequest());
          },
          element: <ManageOrganizationPage />,
        },
      ],
    },
  ]);
