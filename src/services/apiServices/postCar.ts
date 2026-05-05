import api from "../api/api";

interface IProps {
  makeId: string;
  images: File[];
  modelId: string;
  price: number;
  location: string;
  typeId: string;
  lot: string;
  year: string;
}

export const postCar = async ({
  makeId,
  images,
  modelId,
  year,
  price,
  location,
  typeId,
  lot,
}: IProps) => {
  const formData = new FormData();
  formData.append("makeId", makeId);
  formData.append("modelId", modelId);
  formData.append("typeId", typeId);
  formData.append("year", year);
  formData.append("price", price.toString());
  formData.append("location", location);
  formData.append("lot", lot);
  images.forEach((image) => formData.append("images", image));

  const response = await api.post("/cars/create-car", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};
