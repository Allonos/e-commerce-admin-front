import type { UserResponse } from "../../utils/types/userTypes";
import api from "../api/api";

export const cancelBanUser = async (userId: string): Promise<UserResponse> => {
  const response = await api.patch(`/users/unban/${userId}`);
  return response.data;
};
