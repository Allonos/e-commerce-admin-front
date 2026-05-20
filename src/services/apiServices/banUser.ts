import api from "../api/api";

export const banUser = async (userId: string, banReason: string) => {
  const response = await api.patch(`/users/ban/${userId}`, { banReason });
  return response.data;
};
