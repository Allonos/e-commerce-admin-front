import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addHeroVehicle } from "../../../apiServices/addHeroVehicles";

export const useAddHeroVehiclesServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      { image, tagLine, subtitle }: {
        image: File;
        tagLine: string;
        subtitle: string;
      },
    ) => {
      return addHeroVehicle({ image, tagLine, subtitle });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["hero-vehicles"] }),
  });
};
