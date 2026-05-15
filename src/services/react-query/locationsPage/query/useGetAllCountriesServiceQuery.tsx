import { useQuery } from "@tanstack/react-query";
import { getAllCountries } from "../../../apiServices/getAllCountries";

export const useGetAllCountriesServiceQuery = () => {
  return useQuery({
    queryKey: ["getAllCountries"],
    queryFn: () => getAllCountries(),
    staleTime: 1000 * 60 * 60,
    retry: 1,
  });
};
