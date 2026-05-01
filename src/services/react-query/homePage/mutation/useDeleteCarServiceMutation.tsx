import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCar } from "../../../apiServices/deleteCar";

export const useDeleteCarServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCar(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["adminsCars"] });
      queryClient.removeQueries({ queryKey: ["car", id] });
    },
  });
};
