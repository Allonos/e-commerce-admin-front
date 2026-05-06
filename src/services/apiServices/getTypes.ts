import api from "../api/api";

export const getTypes = async () => {
  const response = await api.get("/vehicles/types");
  return response.data;
};
