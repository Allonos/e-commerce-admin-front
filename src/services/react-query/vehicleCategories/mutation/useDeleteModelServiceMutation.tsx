import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteModel } from "../../../apiServices/deleteModel";

export const useDeleteModelServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (modelId: string) => deleteModel(modelId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["models"] });
    },
  });
};
