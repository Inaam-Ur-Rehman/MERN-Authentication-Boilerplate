import { useDispatch } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import client from "../utils/client";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.target as HTMLFormElement).email.value;
    const password = (e.target as HTMLFormElement).password.value;
    dispatch(signInStart());

    try {
      const response = await client.post("/users/signin", {
        email,
        password,
      });
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
      navigate("/dashboard");
    } catch (error: any) {
      console.error(error);
      dispatch(
        signInFailure(error.message || "An error occurred. Please try again.")
      );
    }
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="mb-8 text-3xl font-bold text-center">Login</h1>
        <form className="w-[600px] mx-auto" onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center space-y-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="px-2 py-1 border border-gray-400 rounded"
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="px-2 py-1 border border-gray-400 rounded"
            />
            <button className="px-4 py-2 mx-auto text-white bg-blue-500 rounded max-w-max">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
