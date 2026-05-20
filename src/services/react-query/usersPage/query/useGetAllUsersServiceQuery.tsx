import { useQuery } from "@tanstack/react-query";
import {
  getAllUsers,
  type UsersQueryParams,
} from "../../../apiServices/getAllUsers";

export const useGetAllUsersServiceQuery = (
  page: number = 1,
  limit: number = 10,
  filters: UsersQueryParams = {},
) => {
  return useQuery({
    queryKey: ["allUsers", page, limit, filters],
    queryFn: () => getAllUsers(page, limit, filters),
    staleTime: 1000 * 60 * 5,
  });
};
