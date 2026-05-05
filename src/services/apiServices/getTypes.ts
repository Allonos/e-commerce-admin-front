import api from "../api/api";

export const getTypes = async () => {
  const response = await api.get("/cars/types");
  return response.data;
};
