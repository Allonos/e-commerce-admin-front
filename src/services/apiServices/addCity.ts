import api from "../api/api";

export const addCity = async (name: string, countryId: string) => {
  const response = await api.post("/locations/cities", { name, countryId });
  return response.data;
};
