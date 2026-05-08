import api from "../api/api";

export const deleteHeroVehicle = async (id: string) => {
  const response = await api.delete(`/hero-vehicles/delete-hero-vehicle/${id}`);
  return response.data;
};
