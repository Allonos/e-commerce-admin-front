import type { FormState } from "../../components/ui/modals/useEditVehicleForm";
import type { Action } from "../reducerActions/addVehicleModalAction";

import type { FuelType, Transmission, VehicleCondition } from "./vehicleTypes";

export interface SelectOption {
  label: string;
  value: string;
}

export interface AddVehicleFormProps {
  make: string;
  model: string;
  price: number | undefined;
  location: string;
  date: string;
  type: string;
  lot: string;
  isFeatured: boolean;
  status: string;
  priority: number;
  mileage: number;
  engine: number;
  transmission: Transmission;
  condition: VehicleCondition;
  fuelType: FuelType;
  images: File[];
  previews: string[];
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  formattedDate: string;
  isPending: boolean;
  makesOptions: SelectOption[];
  modelsOptions: SelectOption[];
  typesOptions: SelectOption[];
  dispatch: React.Dispatch<Action>;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
  handleClose: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface EditVehicleFormProps {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  newImages: File[];
  allPreviews: string[];
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  formattedDate: string;
  totalImages: number;
  hasChanges: boolean;
  isPending: boolean;
  makesOptions: SelectOption[];
  modelsOptions: SelectOption[];
  typesOptions: SelectOption[];
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
  handleClose: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
