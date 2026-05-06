import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteVehicle } from "../../../apiServices/deleteVehicle";

export const useDeleteVehicleServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteVehicle(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["adminsVehicles"] });
      queryClient.removeQueries({ queryKey: ["vehicle", id] });
    },
  });
};
