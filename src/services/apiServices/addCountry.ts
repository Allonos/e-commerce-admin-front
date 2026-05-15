import api from "../api/api";

export const addCountry = async (name: string) => {
  const response = await api.post("/locations/countries", { name });
  return response.data;
};
