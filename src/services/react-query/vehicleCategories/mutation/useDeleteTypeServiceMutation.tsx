import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteType } from "../../../apiServices/deleteType";

export const useDeleteTypeServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (typeId: string) => deleteType(typeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["types"] });
    },
  });
};
