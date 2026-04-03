import api from "../api/api";

export const deleteCar = async (id: string) => {
  const response = await api.delete(`/cars/${id}`);

  return response.data;
};
