import api from "../api/api";

export const getVehicleById = async (id: string | undefined) => {
  const response = await api.get(`/vehicles/${id}`);
  return response.data;
};
