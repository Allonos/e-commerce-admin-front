import { useQuery } from "@tanstack/react-query";
import { getTypes } from "../../../apiServices/getTypes";

export const useGetTypesServiceQuery = () => {
  return useQuery({
    queryKey: ["types"],
    queryFn: () => getTypes(),
    staleTime: 1000 * 60 * 60,
    retry: 1,
  });
};
