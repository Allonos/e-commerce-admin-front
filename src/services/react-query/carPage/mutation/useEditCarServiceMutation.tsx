import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCar } from "../../../apiServices/editCar";
import type { Car } from "../../../../utils/types/carTypes";

export const useEditCarServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      makes,
      model,
      year,
      price,
      location,
      type,
      lot,
      newImages,
      existingImages,
    }: {
      id: string;
      makes: string;
      model: string;
      year: string;
      price: number;
      location: string;
      type: string;
      lot: string;
      newImages: File[];
      existingImages: string[];
    }) =>
      editCar({ id, makes, model, year, price, location, type, lot, newImages, existingImages }),
    onSuccess: (data: { car: Car }) => {
      const updatedCar = data.car;

      queryClient.invalidateQueries({ queryKey: ["adminsCars"] });
      queryClient.invalidateQueries({ queryKey: ["car", updatedCar.id] });
    },
  });
};
