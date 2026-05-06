import api from "../api/api";

interface IProps {
  id: string;
  makeId: string;
  modelId: string;
  typeId: string;
  year: string;
  price: number;
  location: string;
  lot: string;
  newImages: File[];
  existingImages: string[];
}

export const editVehicle = async ({
  id,
  makeId,
  modelId,
  typeId,
  year,
  price,
  location,
  lot,
  newImages,
  existingImages,
}: IProps) => {
  const formData = new FormData();
  formData.append("makeId", makeId);
  formData.append("modelId", modelId);
  formData.append("typeId", typeId);
  formData.append("year", year);
  formData.append("price", price.toString());
  formData.append("location", location);
  formData.append("lot", lot);
  existingImages.forEach((url) => formData.append("existingImages", url));
  newImages.forEach((image) => formData.append("images", image));

  const response = await api.patch(`/vehicles/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};
