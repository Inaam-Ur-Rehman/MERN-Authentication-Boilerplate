import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { signOut } from "../redux/features/auth/authSlice";
import client from "../utils/client";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  async function handleLogout() {
    // Add logout functionality here
    try {
      await client.post("/users/logout");
      dispatch(signOut());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <h1 className="my-8 text-4xl font-bold text-center">
        Welcome to the admin dashboard!
      </h1>
      <p className="text-center">
        This is a simple admin dashboard built with React and Tailwind CSS.
      </p>
      <p className="mt-6 text-center">
        You are currently logged in as{" "}
        <span className="font-bold">{auth.user?.name}</span>.
      </p>
      <p className="mt-6 text-center">
        Your email address is{" "}
        <span className="font-bold">{auth.user?.email}</span>
      </p>
      <p className="mt-6 text-center">
        Your role is <span className="font-bold">{auth.user?.role[0]}</span>.
      </p>
      <div className="mt-6 text-center">
        <button
          className="px-4 py-2 text-white bg-red-500 rounded max-w-max"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
