import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeUserRole } from "../../../apiServices/changeUserRole";
import type { UserResponse } from "../../../../utils/types/userTypes";

export const useChangeUserRoleServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    UserResponse,
    unknown,
    { userId: string; newRole: string }
  >({
    mutationFn: async (
      { userId, newRole }: { userId: string; newRole: string },
    ) => changeUserRole(userId, newRole),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["allUsers"] }),
  });
};
