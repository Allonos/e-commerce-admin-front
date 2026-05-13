import api from "../api/api";

export const getModels = async ({ makeId }: { makeId?: string }) => {
  const response = await api.get("/vehicles/categories/models", {
    params: makeId ? { makeId } : undefined,
  });
  return response.data;
};
