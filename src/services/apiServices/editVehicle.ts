import api from "../api/api";
import type {
  FuelType,
  Transmission,
  VehicleCondition,
} from "../../utils/types/vehicleTypes";

interface IProps {
  id: string;
  makeId: string;
  modelId: string;
  typeId: string;
  year: string;
  price: number;
  isFeatured: boolean;
  status: string;
  priority: number;
  mileage: number;
  engine: number;
  transmission: Transmission;
  condition: VehicleCondition;
  fuelType: FuelType;
  cityId: string;
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
  isFeatured,
  status,
  priority,
  mileage,
  engine,
  transmission,
  condition,
  fuelType,
  cityId,
  newImages,
  existingImages,
}: IProps) => {
  const formData = new FormData();
  formData.append("makeId", makeId);
  formData.append("modelId", modelId);
  formData.append("typeId", typeId);
  formData.append("year", year);
  formData.append("price", price.toString());
  formData.append("isFeatured", isFeatured.toString());
  formData.append("status", status);
  formData.append("priority", priority.toString());
  formData.append("mileage", mileage.toString());
  formData.append("engine", engine.toString());
  formData.append("transmission", transmission);
  formData.append("condition", condition);
  formData.append("fuelType", fuelType);
  formData.append("cityId", cityId);
  existingImages.forEach((url) => formData.append("existingImages", url));
  newImages.forEach((image) => formData.append("images", image));

  const response = await api.patch(`/vehicles/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};
