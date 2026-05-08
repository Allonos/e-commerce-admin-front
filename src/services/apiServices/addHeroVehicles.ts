import api from "../api/api";

interface IProps {
  image: File;
  tagLine: string;
  subtitle: string;
}

export const addHeroVehicle = async ({ image, tagLine, subtitle }: IProps) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("tagLine", tagLine);
  formData.append("subtitle", subtitle);

  const response = await api.post("/hero-vehicles/add-hero-vehicle", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};
