import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeUserRole } from "../../../apiServices/changeUserRole";

export const useChangeUserRoleServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      { userId, newRole }: { userId: string; newRole: string },
    ) => changeUserRole(userId, newRole),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["allUsers"] }),
  });
};
