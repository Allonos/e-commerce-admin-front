import api from "../api/api";

interface IProps {
  id: string;
  makes: string;
  model: string;
  year: string;
  price: number;
  location: string;
  type: string;
  lot: string;
  newImages: File[];
  existingImages: string[];
}

export const editCar = async ({
  id,
  makes,
  model,
  year,
  price,
  location,
  type,
  lot,
  newImages,
  existingImages,
}: IProps) => {
  const formData = new FormData();
  formData.append("makes", makes);
  formData.append("model", model);
  formData.append("year", year);
  formData.append("price", price.toString());
  formData.append("location", location);
  formData.append("type", type);
  formData.append("lot", lot);
  existingImages.forEach((url) => formData.append("existingImages", url));
  newImages.forEach((image) => formData.append("images", image));

  const response = await api.patch(`/cars/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};
