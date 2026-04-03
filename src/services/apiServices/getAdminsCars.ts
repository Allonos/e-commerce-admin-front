import type { CarResponse } from "../../utils/types/carTypes";
import api from "../api/api";

// interface IProps {
//   id: string;
// }

export const getAdminsCars = async (): Promise<CarResponse> => {
  const response = await api.get("/cars");
  return response.data;
};
