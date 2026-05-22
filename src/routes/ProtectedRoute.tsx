import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import { useLogoutServiceMutation } from "../services/react-query/logout/mutation/useLogoutServiceMutation";
import { Alert, Button } from "antd";

const ProtectedRoute = () => {
  const { authUser } = useAuthStore();
  const { mutate: logout, isPending } = useLogoutServiceMutation();

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  if (authUser.role !== "ADMIN") {
    return (
      <div className="max-w-175 mx-auto flex items-center justify-center h-screen">
        <Alert
          message="Access Denied"
          description="You do not have permission to access this page. This area is restricted to administrators only."
          type="error"
          showIcon
          action={
            <Button
              danger
              onClick={() => logout()}
              loading={isPending}
            >
              Go to Login
            </Button>
          }
        />
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
