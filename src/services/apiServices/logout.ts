import api from "../api/api";

export const logout = async () => {
  const response = await api.post("/users/logout");
  return response.data;
};
