import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCar } from "../../../apiServices/postCar";

interface IProps {
  make: string;
  images: File[];
  model: string;
  year: string;
  price: number;
  location: string;
  type: string;
}

export const usePostCarServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      { make, images, model, year, price, location, type }: IProps,
    ) => postCar({ make, images, model, year, price, location, type }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminsCars"] });
    },
  });
};
