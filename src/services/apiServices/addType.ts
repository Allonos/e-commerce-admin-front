import api from "../api/api";

export const addBodyType = async (type: string) => {
  const response = await api.post("/vehicles/categories/types", { type });
  return response.data;
};
