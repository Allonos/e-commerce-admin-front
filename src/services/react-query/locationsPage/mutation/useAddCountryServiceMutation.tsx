import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCountry } from "../../../apiServices/addCountry";

export const useAddCountryServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) => addCountry(name),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getAllCountries"] }),
  });
};
