import type { UserResponse } from "../../utils/types/userTypes";
import api from "../api/api";

export const changeAdminRole = async (
  userId: string,
  newAdminRole: string,
): Promise<UserResponse> => {
  const response = await api.patch(`/users/change-admin-role/${userId}`, {
    newAdminRole: newAdminRole,
  });
  return response.data;
};
