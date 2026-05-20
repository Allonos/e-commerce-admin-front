import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelBanUser } from "../../../apiServices/cancelBanUser";
import type { UserResponse } from "../../../../utils/types/userTypes";

export const useCancelBanUserServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<UserResponse, unknown, { userId: string }>({
    mutationFn: ({ userId }: { userId: string }) => cancelBanUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },
  });
};
