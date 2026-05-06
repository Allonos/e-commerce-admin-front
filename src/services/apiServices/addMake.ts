import api from "../api/api";

export const addMake = async (make: string) => {
  const response = await api.post("/vehicles/makes", { make });
  return response.data;
};
