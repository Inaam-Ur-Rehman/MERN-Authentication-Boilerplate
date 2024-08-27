import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RootLayout from "./layouts/RootLayout";
import { useDispatch } from "react-redux";

import { useEffect } from "react";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "./redux/features/auth/authSlice";
import AuthLayout from "./layouts/AuthLayout";
import client from "./utils/client";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Home />,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        dispatch(signInStart());
        const response = await client.get("/users/me");
        dispatch(
          signInSuccess({
            user: {
              id: response.data.id,
              email: response.data.email,
              role: response.data.role,
              name: response.data.name,
            },
            loading: false,
            error: null,
          })
        );
      } catch (error: any) {
        console.error(error);
        dispatch(
          signInFailure(error.message || "An error occurred. Please try again.")
        );
        router.navigate("/login");
      }
    })();
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
