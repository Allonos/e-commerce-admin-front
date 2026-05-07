import api from "../api/api";

export const getHeroVehicles = async () => {
  const response = await api.get("/hero-vehicles/get-hero-vehicles");
  return response.data;
};
