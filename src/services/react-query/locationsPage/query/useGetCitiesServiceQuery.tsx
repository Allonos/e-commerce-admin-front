import { useQuery } from "@tanstack/react-query";
import { getCities } from "../../../apiServices/getCities";

export const useGetCitiesServiceQuery = (countryId?: string) => {
  return useQuery({
    queryKey: ["getCities", countryId],
    queryFn: () => getCities(countryId),
  });
};
