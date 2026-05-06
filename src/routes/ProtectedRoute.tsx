import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

const ProtectedRoute = () => {
  const { authUser } = useAuthStore();
  return authUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
