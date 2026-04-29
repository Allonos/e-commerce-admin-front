import api from "../api/api";

interface IProps {
  make: string;
  images: File[];
  model: string;
  price: number;
  location: string;
  type: string;
  lot: string;
  year: string;
}

export const postCar = async ({
  make,
  images,
  model,
  year,
  price,
  location,
  type,
  lot,
}: IProps) => {
  const formData = new FormData();
  formData.append("makes", make);
  formData.append("model", model);
  formData.append("year", year);
  formData.append("price", price.toString());
  formData.append("location", location);
  formData.append("type", type);
  formData.append("lot", lot);
  images.forEach((image) => formData.append("images", image));

  const response = await api.post("/cars/create-car", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};
