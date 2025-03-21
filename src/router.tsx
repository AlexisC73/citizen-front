import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import DefaultLayout from "./layout/default_layout";

export const createRouter = () =>
  createBrowserRouter([
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
