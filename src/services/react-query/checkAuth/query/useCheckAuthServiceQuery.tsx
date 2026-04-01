import { useQuery } from "@tanstack/react-query";
import { getCheckAuth } from "../../../apiServices/checkAuth";
import type { checkUserTypes } from "../../../../utils/types/checkUserTypes";

export const useGetCheckAuthServiceQuery = () => {
  return useQuery<checkUserTypes>({
    queryKey: ["checkAuth"],
    queryFn: () => getCheckAuth(),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};
