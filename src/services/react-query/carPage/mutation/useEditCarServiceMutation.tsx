import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCar } from "../../../apiServices/editCar";
import type { Car, CarResponse } from "../../../../utils/types/carTypes";

export const useEditCarServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      model,
      year,
      price,
      location,
      newImages,
      existingImages,
    }: {
      id: string;
      model: string;
      year: string;
      price: number;
      location: string;
      newImages: File[];
      existingImages: string[];
    }) =>
      editCar({ id, model, year, price, location, newImages, existingImages }),
    onSuccess: (data: { car: Car }) => {
      const updatedCar = data.car;

      queryClient.setQueryData<CarResponse>(["adminsCars"], (old) => {
        if (!old) return old;
        return {
          ...old,
          cars: old.cars.map((car) =>
            car.id === updatedCar.id ? updatedCar : car
          ),
        };
      });

      queryClient.setQueryData(["car", updatedCar.id], data);
    },
  });
};
