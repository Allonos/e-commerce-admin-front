import type { FormState } from "../../components/ui/modals/useEditCarForm";
import type { Action } from "../reducerActions/addCarModalAction";

export interface SelectOption {
  label: string;
  value: string;
}

export interface AddCarFormProps {
  make: string;
  model: string;
  price: number | undefined;
  location: string;
  date: string;
  type: string;
  lot: string;
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

export interface EditCarFormProps {
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
