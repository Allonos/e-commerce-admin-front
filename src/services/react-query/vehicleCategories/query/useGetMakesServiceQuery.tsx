import { useQuery } from "@tanstack/react-query";
import { getMakes } from "../../../apiServices/getMakes";

export const useGetMakesServiceQuery = () => {
  return useQuery({
    queryKey: ["makes"],
    queryFn: () => getMakes(),
    staleTime: 1000 * 60 * 60,
    retry: 1,
  });
};
