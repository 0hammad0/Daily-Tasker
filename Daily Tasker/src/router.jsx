import { createBrowserRouter } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import DefaultLayout from "./Layout/DefaultLayout";
import GuestLayout from "./Layout/GuestLayout";
import HomePage from "./Pages/Home/HomePage";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";

const router = createBrowserRouter([
  {
    path: "*",
    element: <PageNotFound />,
  },

  // Default Layout Route
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },

  // Guest Layout Route
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/signup",
        element: <Register />,
      },
    ],
  },
]);

export default router;
