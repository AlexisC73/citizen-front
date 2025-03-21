import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";

export const createRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
  ]);
