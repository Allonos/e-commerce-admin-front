import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCar } from "../../../apiServices/postCar";

interface IProps {
  make: string;
  images: File[];
  model: string;
  price: number;
  location: string;
  type: string;
  lot: string;
  year: string;
}

export const usePostCarServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      { make, images, model, year, price, location, type, lot }: IProps,
    ) => postCar({ make, images, model, year, price, location, type, lot }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminsCars"] });
    },
  });
};
