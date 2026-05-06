import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

const GuestRoute = () => {
  const { authUser } = useAuthStore();
  return authUser ? <Navigate to="/" replace /> : <Outlet />;
};

export default GuestRoute;
