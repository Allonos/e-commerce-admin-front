import api from "../api/api";

export const deleteCountry = async (countryId: string) => {
  const response = await api.delete(`/locations/countries/${countryId}`);
  return response.data;
};
