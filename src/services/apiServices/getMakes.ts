import api from "../api/api";

export const getMakes = async () => {
  const response = await api.get("/vehicles/categories/makes");
  return response.data;
};
