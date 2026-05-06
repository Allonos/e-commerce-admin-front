import api from "../api/api";

export const getModels = async ({ makeId }: { makeId: string }) => {
  const response = await api.get(
    `/vehicles/categories/models?makeId=${makeId}`,
  );
  return response.data;
};
