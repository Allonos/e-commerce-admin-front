import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { logout } from "../../../apiServices/logout";
import { useAuthStore } from "../../../../store/useAuthStore";

export const useLogoutServiceMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setAuthUser } = useAuthStore();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      queryClient.setQueryData(["checkAuth"], null);
      setAuthUser(null);
      navigate("/login");
    },
  });
};
