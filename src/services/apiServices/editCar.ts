import api from "../api/api";

interface IProps {
  id: string;
  model: string;
  year: string;
  price: number;
  location: string;
  newImages: File[];
  existingImages: string[];
}

export const editCar = async ({
  id,
  model,
  year,
  price,
  location,
  newImages,
  existingImages,
}: IProps) => {
  const formData = new FormData();
  formData.append("model", model);
  formData.append("year", year);
  formData.append("price", price.toString());
  formData.append("location", location);
  existingImages.forEach((url) => formData.append("existingImages", url));
  newImages.forEach((image) => formData.append("images", image));

  const response = await api.patch(`/cars/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};
