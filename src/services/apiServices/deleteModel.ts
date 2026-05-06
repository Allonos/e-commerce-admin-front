import api from "../api/api";

export const deleteModel = async (modelId: string) => {
  const response = await api.delete(`/vehicles/categories/models/${modelId}`);
  return response.data;
};
