import api from "../api/api";

export const deleteMake = async (makeId: string) => {
  const response = await api.delete(`/vehicles/categories/makes/${makeId}`);
  return response.data;
};
