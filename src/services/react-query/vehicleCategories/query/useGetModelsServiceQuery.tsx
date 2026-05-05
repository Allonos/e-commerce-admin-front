import { useQuery } from "@tanstack/react-query";
import { getModels } from "../../../apiServices/getModels";

export const useGetModelsServiceQuery = (makeId: string) => {
  return useQuery({
    queryKey: ["models", makeId],
    queryFn: () => getModels({ makeId }),
    staleTime: 1000 * 60 * 60,
    retry: 1,
  });
};
