import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBodyType } from "../../../apiServices/addType";

export const useAddTypeServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (type: string) => addBodyType(type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["types"] });
    },
  });
};
