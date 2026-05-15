import { useMutation } from "@tanstack/react-query";
import { addCity } from "../../../apiServices/addCity";

export const useAddCityServiceMutation = () => {
  return useMutation({
    mutationFn: ({ name, countryId }: { name: string; countryId: string }) =>
      addCity(name, countryId),
  });
};
