import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCar } from "../../../apiServices/postCar";

interface IProps {
  images: File[];
  model: string;
  year: string;
  price: number;
  location: string;
}

export const usePostCarServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ images, model, year, price, location }: IProps) =>
      postCar({ images, model, year, price, location }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminsCars"] });
    },
  });
};
