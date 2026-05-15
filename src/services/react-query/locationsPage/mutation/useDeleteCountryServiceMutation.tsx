import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCountry } from "../../../apiServices/deleteCountry";

export const useDeleteCountryServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (countryId: string) => deleteCountry(countryId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllCountries"] }),
  });
};
