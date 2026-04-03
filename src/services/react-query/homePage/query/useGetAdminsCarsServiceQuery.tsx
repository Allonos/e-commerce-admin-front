import { useQuery } from "@tanstack/react-query";
import { getAdminsCars } from "../../../apiServices/getAdminsCars";
import type { CarResponse } from "../../../../utils/types/carTypes";

export const useGetAdminsCarsServiceQuery = () => {
  return useQuery<CarResponse>({
    queryKey: ["adminsCars"],
    queryFn: () => getAdminsCars(),
    staleTime: 1000 * 60 * 5,
  });
};
