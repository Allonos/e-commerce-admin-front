import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postVehicle } from "../../../apiServices/postVehicle";

interface IProps {
  makeId: string;
  images: File[];
  modelId: string;
  price: number;
  location: string;
  typeId: string;
  lot: string;
  year: string;
  isFeatured: boolean;
}

export const usePostVehicleServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      {
        makeId,
        images,
        modelId,
        year,
        price,
        location,
        typeId,
        lot,
        isFeatured,
      }: IProps,
    ) =>
      postVehicle({
        makeId,
        images,
        modelId,
        year,
        price,
        location,
        typeId,
        lot,
        isFeatured,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminsVehicles"] });
    },
  });
};
