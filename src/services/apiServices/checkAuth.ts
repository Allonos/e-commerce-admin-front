import type { checkUserTypes } from "../../utils/types/checkUserTypes";
import api from "../api/api";

export const getCheckAuth = async (): Promise<checkUserTypes> => {
  const response = await api.get("users/check");
  return response.data;
};
