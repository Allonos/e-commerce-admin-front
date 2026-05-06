import api from "../api/api";

export const deleteVehicle = async (id: string) => {
  const response = await api.delete(`/vehicles/${id}`);

  return response.data;
};
