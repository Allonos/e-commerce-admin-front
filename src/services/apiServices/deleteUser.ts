import api from "../api/api";

export const deleteUser = async (userId: string) => {
  const response = await api.delete(`/users/${userId}`);
  return response.data;
};
