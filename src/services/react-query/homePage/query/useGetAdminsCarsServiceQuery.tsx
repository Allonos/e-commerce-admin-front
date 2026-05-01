import { useQuery } from "@tanstack/react-query";
import { getAdminsCars } from "../../../apiServices/getAdminsCars";
import type { CarResponse } from "../../../../utils/types/carTypes";

export const useGetAdminsCarsServiceQuery = (page: number = 1) => {
  return useQuery<CarResponse>({
    queryKey: ["adminsCars", page],
    queryFn: () => getAdminsCars(page),
    staleTime: 1000 * 60 * 5,
  });
};
