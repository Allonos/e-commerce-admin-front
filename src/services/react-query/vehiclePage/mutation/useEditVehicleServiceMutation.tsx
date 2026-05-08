import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editVehicle } from "../../../apiServices/editVehicle";
import type { Vehicle } from "../../../../utils/types/vehicleTypes";

export const useEditVehicleServiceMutation = () => {
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
      isFeatured,
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
      isFeatured: boolean;
    }) =>
      editVehicle({
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
        isFeatured,
      }),
    onSuccess: (data: { vehicle: Vehicle }) => {
      const updatedVehicle = data.vehicle;

      queryClient.invalidateQueries({ queryKey: ["adminsVehicles"] });
      queryClient.invalidateQueries({
        queryKey: ["vehicle", updatedVehicle.id],
      });
    },
  });
};
