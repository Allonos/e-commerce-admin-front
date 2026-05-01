import type { CarResponse } from "../../utils/types/carTypes";
import api from "../api/api";

export const getAdminsCars = async (page: number = 1): Promise<CarResponse> => {
  const response = await api.get("/cars", {
    params: {
      page,
      limit: 1,
    },
  });
  return response.data;
};
