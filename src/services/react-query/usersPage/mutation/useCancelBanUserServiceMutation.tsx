import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelBanUser } from "../../../apiServices/cancelBanUser";

export const useCancelBanUserServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelBanUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },
  });
};
