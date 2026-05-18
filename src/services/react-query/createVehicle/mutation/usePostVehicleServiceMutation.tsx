import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postVehicle } from "../../../apiServices/postVehicle";
import type { FuelType, Transmission, VehicleCondition } from "../../../../utils/types/vehicleTypes";

interface IProps {
  makeId: string;
  images: File[];
  modelId: string;
  price: number;
  typeId: string;
  year: string;
  isFeatured: boolean;
  status: string;
  priority: number;
  mileage: number;
  engine: number;
  transmission: Transmission;
  condition: VehicleCondition;
  fuelType: FuelType;
  cityId: string;
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
        typeId,
        isFeatured,
        status,
        priority,
        mileage,
        engine,
        transmission,
        condition,
        fuelType,
        cityId,
      }: IProps,
    ) =>
      postVehicle({
        makeId,
        images,
        modelId,
        year,
        price,
        typeId,
        isFeatured,
        status,
        priority,
        mileage,
        engine,
        transmission,
        condition,
        fuelType,
        cityId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminsVehicles"] });
    },
  });
};
