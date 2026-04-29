import { useRef, useState } from "react";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { useEditCarServiceMutation } from "../../../services/react-query/carPage/mutation/useEditCarServiceMutation";
import type { Car } from "../../../utils/types/carTypes";

interface FormState {
  makes: string;
  model: string;
  price: number | undefined;
  location: string;
  date: string;
  type: string;
  lot: string;
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
  existingImages: [],
};

const carToForm = (car: Car): FormState => ({
  makes: car.makes,
  model: car.model,
  price: car.price,
  location: car.location,
  date: car.year,
  type: car.type,
  lot: car.lot,
  existingImages: car.images,
});

export const useEditCarForm = (car: Car | null, onClose: () => void) => {
  const [form, setForm] = useState<FormState>(
    car ? carToForm(car) : EMPTY_FORM,
  );
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [prevCar, setPrevCar] = useState<Car | null>(car);
  if (car !== prevCar) {
    setPrevCar(car);
    newPreviews.forEach((url) => URL.revokeObjectURL(url));
    setForm(car ? carToForm(car) : EMPTY_FORM);
    setNewImages([]);
    setNewPreviews([]);
  }

  const formattedDate = form.date ? dayjs(form.date).format("YYYY") : "";
  const totalImages = form.existingImages.length + newImages.length;
  const allPreviews = [...form.existingImages, ...newPreviews];

  const originalForm = car ? carToForm(car) : EMPTY_FORM;
  const hasFieldChanges =
    form.makes !== originalForm.makes ||
    form.model !== originalForm.model ||
    form.price !== originalForm.price ||
    form.location !== originalForm.location ||
    form.date !== originalForm.date ||
    form.type !== originalForm.type ||
    form.lot !== originalForm.lot;
  const hasImageChanges =
    newImages.length > 0 ||
    form.existingImages.length !== (car?.images.length ?? 0);
  const hasChanges = hasFieldChanges || hasImageChanges;

  const { mutate: editCarMutate, isPending } = useEditCarServiceMutation();

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
    setForm(car ? carToForm(car) : EMPTY_FORM);
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
    editCarMutate(
      {
        id: car!.id,
        makes: form.makes,
        model: form.model,
        year: form.date,
        price: Number(form.price),
        location: form.location,
        type: form.type,
        lot: form.lot,
        newImages,
        existingImages: form.existingImages,
      },
      {
        onSuccess: () => {
          toast.success("Car updated successfully!");
          handleClose();
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
