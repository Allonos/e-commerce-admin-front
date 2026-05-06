import api from "../api/api";

export const addMake = async (make: string) => {
  const response = await api.post("/vehicles/categories/makes", { make });
  return response.data;
};
