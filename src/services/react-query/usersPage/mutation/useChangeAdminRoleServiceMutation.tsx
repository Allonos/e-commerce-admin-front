import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeAdminRole } from "../../../apiServices/changeAdminRole";

export const useChangeAdminRoleServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      { userId, newAdminRole }: { userId: string; newAdminRole: string },
    ) => changeAdminRole(userId, newAdminRole),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["allUsers"] }),
  });
};
