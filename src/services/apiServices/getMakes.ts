import api from "../api/api";

export const getMakes = async () => {
  const response = await api.get("/vehicles/makes");
  return response.data;
};
