import api from "../api/api";

export const cancelBanUser = async (userId: string) => {
  const response = await api.patch(`/users/unban/${userId}`);
  return response.data;
};
