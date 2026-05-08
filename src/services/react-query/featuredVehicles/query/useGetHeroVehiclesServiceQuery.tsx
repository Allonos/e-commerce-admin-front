import { useQuery } from "@tanstack/react-query";
import { getHeroVehicles } from "../../../apiServices/getHeroVehicles";
import type { HeroVehiclesResponse } from "../../../../utils/types/heroVehiclesTypes";

export const useGetHeroVehiclesServiceQuery = () => {
  return useQuery<HeroVehiclesResponse>({
    queryKey: ["hero-vehicles"],
    queryFn: () => getHeroVehicles(),
    staleTime: 5 * 60 * 1000,
  });
};
