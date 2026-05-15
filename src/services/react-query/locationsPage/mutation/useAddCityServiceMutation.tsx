import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCity } from "../../../apiServices/addCity";

export const useAddCityServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, countryId }: { name: string; countryId: string }) =>
      addCity(name, countryId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getCities"] }),
  });
};
