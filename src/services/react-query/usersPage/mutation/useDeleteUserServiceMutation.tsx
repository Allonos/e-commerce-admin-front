import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../../../apiServices/deleteUser";

export const useDeleteUserServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => await deleteUser(userId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["allUsers"] }),
  });
};
