import api from "../api/api";

interface IProps {
  make: string;
  images: File[];
  model: string;
  year: string;
  price: number;
  location: string;
  type: string;
}

export const postCar = async ({
  make,
  images,
  model,
  year,
  price,
  location,
  type,
}: IProps) => {
  const formData = new FormData();
  formData.append("makes", make);
  formData.append("model", model);
  formData.append("year", year);
  formData.append("price", price.toString());
  formData.append("location", location);
  formData.append("type", type);
  images.forEach((image) => formData.append("images", image));

  const response = await api.post("/cars/create-car", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};
