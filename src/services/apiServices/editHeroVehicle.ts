import api from "../api/api";

interface IProps {
  id: string;
  image: File | null;
  tagLine: string;
  subtitle: string;
}

export const editHeroVehicle = async ({
  id,
  image,
  tagLine,
  subtitle,
}: IProps) => {
  const formData = new FormData();
  formData.append("heroId", id);
  formData.append("tagLine", tagLine);
  formData.append("subtitle", subtitle);
  if (image) formData.append("file", image);

  const response = await api.patch(
    `/hero-vehicles/edit-hero-vehicle/${id}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );

  return response.data;
};
