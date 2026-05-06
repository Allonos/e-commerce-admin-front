import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMake } from "../../../apiServices/deleteMake";

export const useDeleteMakeServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (makeId: string) => deleteMake(makeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["makes"] });
    },
  });
};
