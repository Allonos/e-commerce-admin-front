import api from "../api/api";

export const getCities = async (countryId?: string) => {
  const response = await api.get("/locations/cities", {
    params: { countryId },
  });
  return response.data;
};
