import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";
import Loader from "../components/Loader";

export default function AuthLayout() {
  const auth = useSelector((state: RootState) => state.auth);

  if (auth.loading) {
    return <Loader />;
  }

  if (auth.user?.id) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
}
