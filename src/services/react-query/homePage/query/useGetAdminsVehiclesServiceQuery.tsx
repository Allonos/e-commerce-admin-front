import { useQuery } from "@tanstack/react-query";
import { getAdminsVehicles } from "../../../apiServices/getAdminsVehicles";
import type { VehicleQueryParams } from "../../../apiServices/getAdminsVehicles";
import type { VehicleResponse } from "../../../../utils/types/vehicleTypes";

export const useGetAdminsVehiclesServiceQuery = (
  page: number = 1,
  limit: number = 10,
  filters: VehicleQueryParams = {},
) => {
  return useQuery<VehicleResponse>({
    queryKey: ["adminsVehicles", page, limit, filters],
    queryFn: () => getAdminsVehicles(page, limit, filters),
    staleTime: 1000 * 60 * 5,
  });
};
