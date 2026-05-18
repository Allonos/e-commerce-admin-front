import type { VehicleResponse } from "../../utils/types/vehicleTypes";
import api from "../api/api";

export interface VehicleQueryParams {
  lot?: string;
  make?: string;
  model?: string;
  bodyType?: string;
  country?: string;
  city?: string;
  condition?: string;
  transmission?: string;
  fuelType?: string;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  minMileage?: number;
  maxMileage?: number;
  minEngine?: number;
  maxEngine?: number;
  minYear?: number;
  maxYear?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  featured?: boolean;
}

export const getAdminsVehicles = async (
  page: number = 1,
  limit: number = 10,
  filters: VehicleQueryParams = {},
): Promise<VehicleResponse> => {
  const response = await api.get("/vehicles", {
    params: { page, limit, ...filters },
  });
  return response.data;
};
