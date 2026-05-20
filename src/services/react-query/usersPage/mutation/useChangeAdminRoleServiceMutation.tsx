import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeAdminRole } from "../../../apiServices/changeAdminRole";
import type { UserResponse } from "../../../../utils/types/userTypes";

export const useChangeAdminRoleServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    UserResponse,
    unknown,
    { userId: string; newAdminRole: string }
  >({
    mutationFn: async (
      { userId, newAdminRole }: { userId: string; newAdminRole: string },
    ) => changeAdminRole(userId, newAdminRole),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["allUsers"] }),
  });
};
