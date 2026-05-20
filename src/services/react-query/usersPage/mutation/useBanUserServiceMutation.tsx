import { useMutation, useQueryClient } from "@tanstack/react-query";
import { banUser } from "../../../apiServices/banUser";

export const useBanUserServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      { userId, banReason }: { userId: string; banReason: string },
    ) => await banUser(userId, banReason),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["allUsers"] }),
  });
};
