import type { UserResponse } from "../../utils/types/userTypes";
import api from "../api/api";

export const changeUserRole = async (
  userId: string,
  newRole: string,
): Promise<UserResponse> => {
  const response = await api.patch(`/users/change-role/${userId}`, {
    role: newRole,
  });

  return response.data;
};
