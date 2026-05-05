import api from "../api/api";

export const getMakes = async () => {
  const response = await api.get("/cars/makes");
  return response.data;
};
