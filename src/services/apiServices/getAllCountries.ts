import api from "../api/api";

export const getAllCountries = async () => {
  const response = await api.get("/locations/countries");
  return response.data;
};
