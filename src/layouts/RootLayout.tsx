import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

export default function RootLayout() {
  const auth = useSelector((state: RootState) => state.auth);

  if (auth.loading) {
    return <Loader />;
  }

  if (auth.user?.id) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
}
