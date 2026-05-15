import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCity } from "../../../apiServices/deleteCity";

export const useDeleteCityServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cityId: string) => deleteCity(cityId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getCities"] }),
  });
};
