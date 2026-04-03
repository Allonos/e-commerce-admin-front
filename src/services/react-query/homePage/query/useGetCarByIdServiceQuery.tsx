import { useQuery } from "@tanstack/react-query";
import { getCarById } from "../../../apiServices/getCarById";

export const useGetCarByIdServiceQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: ["car", id],
    queryFn: async () => getCarById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};
