import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addModel } from "../../../apiServices/addModel";

export const useAddModelServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ model, makeId }: { model: string; makeId: string }) =>
      addModel(model, makeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["models"] });
    },
  });
};
