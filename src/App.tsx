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
      dispatch(signInStart());
      const response = await fetch("http://localhost:3000/api/users/me", {
        credentials: "include",
      });
      const data = await response.json();
      if (data.error || !response.ok) {
        console.error(data.error);
        dispatch(
          signInFailure(data.error || "An error occurred. Please try again.")
        );
        router.navigate("/login");
      } else {
        dispatch(
          signInSuccess({
            user: {
              id: data.id,
              email: data.email,
              role: data.role,
              name: data.name,
            },
            loading: false,
            error: null,
          })
        );
      }
    })();
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
