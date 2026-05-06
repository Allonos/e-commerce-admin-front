import { useQuery } from "@tanstack/react-query";
import { getVehicleById } from "../../../apiServices/getVehicleById";

export const useGetVehicleByIdServiceQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: ["vehicle", id],
    queryFn: async () => getVehicleById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
