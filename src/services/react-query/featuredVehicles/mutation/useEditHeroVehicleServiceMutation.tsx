import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editHeroVehicle } from "../../../apiServices/editHeroVehicle";

export const useEditHeroVehicleServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      image,
      tagLine,
      subtitle,
    }: {
      id: string;
      image: File | null;
      tagLine: string;
      subtitle: string;
    }) => editHeroVehicle({ id, image, tagLine, subtitle }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["hero-vehicles"] }),
  });
};
