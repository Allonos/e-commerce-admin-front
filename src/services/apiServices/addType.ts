import api from "../api/api";

export const addBodyType = async (type: string) => {
  const response = await api.post("/vehicles/types", { type });
  return response.data;
};
