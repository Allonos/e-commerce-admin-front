import type { HeroVehiclesResponse } from "../../utils/types/heroVehiclesTypes";
import api from "../api/api";

export const getHeroVehicles = async (): Promise<HeroVehiclesResponse> => {
  const response = await api.get("/hero-vehicles/get-hero-vehicles");
  return response.data;
};
