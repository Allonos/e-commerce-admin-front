import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postVehicle } from "../../../apiServices/postVehicle";
import type { FuelType, Transmission, VehicleCondition } from "../../../../utils/types/vehicleTypes";

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
  status: string;
  priority: number;
  mileage: number;
  engine: number;
  transmission: Transmission;
  condition: VehicleCondition;
  fuelType: FuelType;
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
        status,
        priority,
        mileage,
        engine,
        transmission,
        condition,
        fuelType,
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
        status,
        priority,
        mileage,
        engine,
        transmission,
        condition,
        fuelType,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminsVehicles"] });
    },
  });
};
