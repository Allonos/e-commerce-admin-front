import api from "../api/api";

export const changeAdminRole = async (userId: string, newAdminRole: string) => {
  const response = await api.patch(`/users/change-admin-role/${userId}`, {
    newAdminRole: newAdminRole,
  });
  return response.data;
};
