import type { VehicleResponse } from "../../utils/types/vehicleTypes";
import api from "../api/api";

export const getAdminsVehicles = async (
  page: number = 1,
  limit: number = 10,
): Promise<VehicleResponse> => {
  const response = await api.get("/vehicles", {
    params: {
      page,
      limit,
    },
  });
  return response.data;
};
