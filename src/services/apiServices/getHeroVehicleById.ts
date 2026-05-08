import api from "../api/api";

export const getHeroVehicleById = async (id: string) => {
  const response = await api.get(`/hero-vehicles/get-hero-vehicle/${id}`);
  return response.data;
};
