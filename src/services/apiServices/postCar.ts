import api from "../api/api";

interface IProps {
  images: File[];
  model: string;
  year: string;
  price: number;
  location: string;
}

export const postCar = async ({
  images,
  model,
  year,
  price,
  location,
}: IProps) => {
  const formData = new FormData();
  formData.append("model", model);
  formData.append("year", year);
  formData.append("price", price.toString());
  formData.append("location", location);
  images.forEach((image) => formData.append("images", image));

  const response = await api.post("/cars/create-car", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};
