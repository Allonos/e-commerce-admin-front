import api from "../api/api";

export const addModel = async (model: string, makeId: string) => {
  const response = await api.post("/vehicles/models", { model, makeId });
  return response.data;
};
