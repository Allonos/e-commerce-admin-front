import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteHeroVehicle } from "../../../apiServices/deleteHeroVehicles";

export const useDeleteHeroVehiclesServiceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteHeroVehicle(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["hero-vehicles"] }),
  });
};
