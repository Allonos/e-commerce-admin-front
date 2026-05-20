import api from "../api/api";

export const changeUserRole = async (userId: string, newRole: string) => {
  const response = await api.patch(`/users/change-role/${userId}`, {
    role: newRole,
  });

  return response.data;
};
