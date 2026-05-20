import { useMutation, useQueryClient } from "@tanstack/react-query";
import { banUser } from "../../../apiServices/banUser";
import type { UserResponse } from "../../../../utils/types/userTypes";

export const useBanUserServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    UserResponse,
    unknown,
    { userId: string; banReason: string }
  >({
    mutationFn: async (
      { userId, banReason }: { userId: string; banReason: string },
    ) => await banUser(userId, banReason),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["allUsers"] }),
  });
};
