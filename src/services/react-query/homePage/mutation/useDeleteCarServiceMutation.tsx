import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCar } from "../../../apiServices/deleteCar";
import type { CarResponse } from "../../../../utils/types/carTypes";

export const useDeleteCarServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCar(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData<CarResponse>(["adminsCars"], (old) => {
        if (!old) return old;
        return {
          ...old,
          cars: old.cars.filter((car) => car.id !== id),
        };
      });

      queryClient.removeQueries({ queryKey: ["car", id] });
    },
  });
};
