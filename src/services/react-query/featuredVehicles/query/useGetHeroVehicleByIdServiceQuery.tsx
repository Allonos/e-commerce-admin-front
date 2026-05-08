import { useQuery } from "@tanstack/react-query";
import { getHeroVehicleById } from "../../../apiServices/getHeroVehicleById";

export const useGetHeroVehicleByIdServiceQuery = (id: string) => {
  return useQuery({
    queryKey: ["hero-vehicle-by-id", id],
    queryFn: () => getHeroVehicleById(id),
    retry: false,
  });
};
