import api from "../api/api";

export interface UsersQueryParams {
  username?: string;
  role?: string;
  isBanned?: string;
}

export const getAllUsers = async (
  page: number = 1,
  limit: number = 10,
  filters: UsersQueryParams = {},
) => {
  const response = await api.get("/users", {
    params: { page, limit, ...filters },
  });
  return response.data;
};
