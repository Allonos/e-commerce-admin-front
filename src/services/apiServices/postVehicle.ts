import api from "../api/api";
import type {
  FuelType,
  Transmission,
  VehicleCondition,
} from "../../utils/types/vehicleTypes";

interface IProps {
  makeId: string;
  images: File[];
  modelId: string;
  price: number;
  typeId: string;
  lot: number;
  year: string;
  isFeatured: boolean;
  status: string;
  priority: number;
  mileage: number;
  engine: number;
  transmission: Transmission;
  condition: VehicleCondition;
  fuelType: FuelType;
  cityId: string;
}

export const postVehicle = async ({
  makeId,
  images,
  modelId,
  year,
  price,
  typeId,
  lot,
  isFeatured,
  status,
  priority,
  mileage,
  engine,
  transmission,
  condition,
  fuelType,
  cityId,
}: IProps) => {
  const formData = new FormData();
  formData.append("makeId", makeId);
  formData.append("modelId", modelId);
  formData.append("typeId", typeId);
  formData.append("year", year);
  formData.append("price", price.toString());
  formData.append("lot", lot.toString());
  formData.append("isFeatured", isFeatured.toString());
  formData.append("status", status);
  formData.append("priority", priority.toString());
  formData.append("mileage", mileage.toString());
  formData.append("engine", engine.toString());
  formData.append("transmission", transmission);
  formData.append("condition", condition);
  formData.append("fuelType", fuelType);
  formData.append("cityId", cityId);
  images.forEach((image) => formData.append("images", image));

  const response = await api.post("/vehicles/create-vehicle", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};
