import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMake } from "../../../apiServices/addMake";

export const useAddMakeServiceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (make: string) => addMake(make),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["makes"] });
    },
  });
};
