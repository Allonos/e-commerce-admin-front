import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCar } from "../../../apiServices/editCar";
import type { Car } from "../../../../utils/types/carTypes";

export const useEditCarServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      makeId,
      modelId,
      typeId,
      year,
      price,
      location,
      lot,
      newImages,
      existingImages,
    }: {
      id: string;
      makeId: string;
      modelId: string;
      typeId: string;
      year: string;
      price: number;
      location: string;
      lot: string;
      newImages: File[];
      existingImages: string[];
    }) =>
      editCar({ id, makeId, modelId, typeId, year, price, location, lot, newImages, existingImages }),
    onSuccess: (data: { car: Car }) => {
      const updatedCar = data.car;

      queryClient.invalidateQueries({ queryKey: ["adminsCars"] });
      queryClient.invalidateQueries({ queryKey: ["car", updatedCar.id] });
    },
  });
};
