import type { UserResponse } from "../../utils/types/userTypes";
import api from "../api/api";

export const banUser = async (
  userId: string,
  banReason: string,
): Promise<UserResponse> => {
  const response = await api.patch(`/users/ban/${userId}`, { banReason });
  return response.data;
};
