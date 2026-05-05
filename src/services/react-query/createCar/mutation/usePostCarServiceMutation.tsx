import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCar } from "../../../apiServices/postCar";

interface IProps {
  makeId: string;
  images: File[];
  modelId: string;
  price: number;
  location: string;
  typeId: string;
  lot: string;
  year: string;
}

export const usePostCarServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      { makeId, images, modelId, year, price, location, typeId, lot }: IProps,
    ) => postCar({ makeId, images, modelId, year, price, location, typeId, lot }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminsCars"] });
    },
  });
};
