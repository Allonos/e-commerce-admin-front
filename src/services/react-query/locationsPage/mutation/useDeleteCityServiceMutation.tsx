import { useMutation } from "@tanstack/react-query";
import { deleteCity } from "../../../apiServices/deleteCity";

export const useDeleteCityServiceMutation = () => {
  return useMutation({
    mutationFn: (cityId: string) => deleteCity(cityId),
  });
};
