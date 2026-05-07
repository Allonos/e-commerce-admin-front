import { useQuery } from "@tanstack/react-query";
import { getHeroVehicles } from "../../../apiServices/getHeroVehicles";

export const useGetHeroVehiclesServiceQuery = () => {
  return useQuery({
    queryKey: ["hero-vehicles"],
    queryFn: () => getHeroVehicles(),
    staleTime: 5 * 60 * 1000,
  });
};
