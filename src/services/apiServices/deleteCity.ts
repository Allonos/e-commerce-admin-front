import api from "../api/api";

export const deleteCity = async (cityId: string) => {
  const response = await api.delete(`/locations/cities/${cityId}`);
  return response.data;
};
