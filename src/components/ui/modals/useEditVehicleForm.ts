import { useRef, useState } from "react";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { useEditVehicleServiceMutation } from "../../../services/react-query/vehiclePage/mutation/useEditVehicleServiceMutation";
import type { Vehicle } from "../../../utils/types/vehicleTypes";

export interface FormState {
  makes: string;
  model: string;
  price: number | undefined;
  location: string;
  date: string;
  type: string;
  lot: string;
  isFeatured: boolean;
  existingImages: string[];
}

const EMPTY_FORM: FormState = {
  makes: "",
  model: "",
  price: undefined,
  location: "",
  date: "",
  type: "",
  lot: "",
  isFeatured: false,
  existingImages: [],
};

const vehicleToForm = (vehicle: Vehicle): FormState => ({
  makes: vehicle.make.id,
  model: vehicle.model.id,
  price: vehicle.price,
  location: vehicle.location,
  date: String(vehicle.year),
  type: vehicle.type.id,
  lot: vehicle.lot,
  isFeatured: vehicle.isFeatured,
  existingImages: vehicle.images,
});

export const useEditVehicleForm = (vehicle: Vehicle | null, onClose: () => void) => {
  const [form, setForm] = useState<FormState>(
    vehicle ? vehicleToForm(vehicle) : EMPTY_FORM,
  );
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [prevVehicle, setPrevVehicle] = useState<Vehicle | null>(vehicle);
  if (vehicle !== prevVehicle) {
    setPrevVehicle(vehicle);
    newPreviews.forEach((url) => URL.revokeObjectURL(url));
    setForm(vehicle ? vehicleToForm(vehicle) : EMPTY_FORM);
    setNewImages([]);
    setNewPreviews([]);
  }

  const formattedDate = form.date ? dayjs(form.date).format("YYYY") : "";
  const totalImages = form.existingImages.length + newImages.length;
  const allPreviews = [...form.existingImages, ...newPreviews];

  const originalForm = vehicle ? vehicleToForm(vehicle) : EMPTY_FORM;
  const hasFieldChanges =
    form.makes !== originalForm.makes ||
    form.model !== originalForm.model ||
    form.price !== originalForm.price ||
    form.location !== originalForm.location ||
    form.date !== originalForm.date ||
    form.type !== originalForm.type ||
    form.lot !== originalForm.lot ||
    form.isFeatured !== originalForm.isFeatured;
  const hasImageChanges =
    newImages.length > 0 ||
    form.existingImages.length !== (vehicle?.images.length ?? 0);
  const hasChanges = hasFieldChanges || hasImageChanges;

  const { mutate: editVehicleMutate, isPending } = useEditVehicleServiceMutation();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files);
    if (totalImages + selected.length > 4) {
      toast.error("You can only upload up to 4 images.");
      e.target.value = "";
      return;
    }
    const newPreviewUrls = selected.map((file) => URL.createObjectURL(file));
    setNewImages((prev) => [...prev, ...selected]);
    setNewPreviews((prev) => [...prev, ...newPreviewUrls]);
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    if (index < form.existingImages.length) {
      setForm((prev) => ({
        ...prev,
        existingImages: prev.existingImages.filter((_, i) => i !== index),
      }));
    } else {
      const newIndex = index - form.existingImages.length;
      URL.revokeObjectURL(newPreviews[newIndex]);
      setNewImages((prev) => prev.filter((_, i) => i !== newIndex));
      setNewPreviews((prev) => prev.filter((_, i) => i !== newIndex));
    }
  };

  const handleClose = () => {
    newPreviews.forEach((url) => URL.revokeObjectURL(url));
    setForm(vehicle ? vehicleToForm(vehicle) : EMPTY_FORM);
    setNewImages([]);
    setNewPreviews([]);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!hasChanges) return;
    if (totalImages === 0) {
      toast.error("Please keep at least one image.");
      return;
    }
    editVehicleMutate(
      {
        id: vehicle!.id,
        makeId: form.makes,
        modelId: form.model,
        typeId: form.type,
        year: form.date,
        price: Number(form.price),
        location: form.location,
        lot: form.lot,
        isFeatured: form.isFeatured,
        newImages,
        existingImages: form.existingImages,
      },
      {
        onSuccess: () => {
          toast.success("Vehicle updated successfully!");
          handleClose();
        },
        onError: (error: unknown) => {
          const message = (
            error as { response?: { data?: { error?: string } } }
          )?.response?.data?.error;
          toast.error(message ?? "Something went wrong.");
        },
      },
    );
  };

  return {
    form,
    setForm,
    newImages,
    allPreviews,
    fileInputRef,
    formattedDate,
    totalImages,
    hasChanges,
    isPending,
    handleImageChange,
    removeImage,
    handleClose,
    handleSubmit,
  };
};
