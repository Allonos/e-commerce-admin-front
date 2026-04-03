import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCar } from "../../../apiServices/deleteCar";

export const useDeleteCarServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminsCars"] });
    },
  });
};
