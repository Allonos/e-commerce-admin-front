import { useQuery } from "@tanstack/react-query";
import { getAdminsVehicles } from "../../../apiServices/getAdminsVehicles";
import type { VehicleResponse } from "../../../../utils/types/vehicleTypes";

export const useGetAdminsVehiclesServiceQuery = (page: number = 1) => {
  return useQuery<VehicleResponse>({
    queryKey: ["adminsVehicles", page],
    queryFn: () => getAdminsVehicles(page),
    staleTime: 1000 * 60 * 5,
  });
};
