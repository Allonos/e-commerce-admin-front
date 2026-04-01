import { useQuery } from "@tanstack/react-query";
import { getAdminsCars } from "../../../apiServices/getAdminsCars";

export const useGetAdminsCarsServiceQuery = () => {
  return useQuery({
    queryKey: ["adminsCars"],
    queryFn: () => getAdminsCars(),
    staleTime: 1000 * 60 * 5,
  });
};
