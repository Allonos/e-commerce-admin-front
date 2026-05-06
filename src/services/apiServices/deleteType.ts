import api from "../api/api";

export const deleteType = async (typeId: string) => {
  const response = await api.delete(`/vehicles/categories/types/${typeId}`);
  return response.data;
};
