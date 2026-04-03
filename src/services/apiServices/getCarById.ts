import api from "../api/api";

export const getCarById = async (id: string | undefined) => {
  const response = await api.get(`/cars/${id}`);
  return response.data;
};
