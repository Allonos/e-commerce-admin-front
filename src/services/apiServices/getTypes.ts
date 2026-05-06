import api from "../api/api";

export const getTypes = async () => {
  const response = await api.get("/vehicles/categories/types");
  return response.data;
};
