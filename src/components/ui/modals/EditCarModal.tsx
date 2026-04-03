import { useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { useEditCarServiceMutation } from "../../../services/react-query/carPage/mutation/useEditCarServiceMutation";

interface Car {
  id: string;
  model: string;
  year: string;
  price: number;
  location: string;
  images: string[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  car: Car | null;
}

const MAX_IMAGES = 4;

interface FormState {
  model: string;
  price: number | undefined;
  location: string;
  date: string;
  existingImages: string[];
}

const EMPTY_FORM: FormState = {
  model: "",
  price: undefined,
  location: "",
  date: "",
  existingImages: [],
};

const carToForm = (car: Car): FormState => ({
  model: car.model,
  price: car.price,
  location: car.location,
  date: car.year,
  existingImages: car.images,
});

const EditCarModal = ({ isOpen, onClose, car }: Props) => {
  const [form, setForm] = useState<FormState>(
    car ? carToForm(car) : EMPTY_FORM,
  );
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [prevCarId, setPrevCarId] = useState(car?.id);
  if (car?.id !== prevCarId) {
    setPrevCarId(car?.id);
    setForm(car ? carToForm(car) : EMPTY_FORM);
  }

  const formattedDate = form.date ? dayjs(form.date).format("YYYY") : "";
  const totalImages = form.existingImages.length + newImages.length;

  const { mutate: editCarMutate, isPending } = useEditCarServiceMutation();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selected = Array.from(e.target.files);

    if (totalImages + selected.length > MAX_IMAGES) {
      toast.error(`You can only upload up to ${MAX_IMAGES} images.`);
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
    setForm(EMPTY_FORM);
    setNewImages([]);
    setNewPreviews([]);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.model || !form.price || !form.location || !form.date) {
      toast.error("All fields are required.");
      return;
    }

    if (totalImages === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    editCarMutate(
      {
        id: car!.id,
        model: form.model,
        year: form.date,
        price: Number(form.price),
        location: form.location,
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

  const allPreviews = [...form.existingImages, ...newPreviews];

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-200 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Edit Car</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-black transition-colors duration-200 cursor-pointer"
          >
            <X width={20} height={20} />
          </button>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Car Name
            </label>
            <input
              type="text"
              value={form.model}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, model: e.target.value }))}
              placeholder="e.g. Tesla Model 3"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              value={form.price ?? ""}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, price: Number(e.target.value) }))}
              placeholder="e.g. 42990"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              value={form.location}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, location: e.target.value }))}
              placeholder="e.g. San Francisco, CA"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="text"
              value={form.date}
              placeholder="2026"
              onChange={(e) =>
                setForm((prev) => ({ ...prev, date: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors duration-200"
            />
            {formattedDate && (
              <p className="text-xs text-gray-400 mt-1">{formattedDate}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Images{" "}
              <span className="text-gray-400 font-normal">
                ({totalImages}/{MAX_IMAGES})
              </span>
            </label>

            {allPreviews.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mb-2">
                {allPreviews.map((src, i) => (
                  <div key={i} className="relative group aspect-square">
                    <img
                      src={src}
                      alt={`preview-${i}`}
                      className="w-full h-full object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        removeImage(i)}
                      className="absolute -top-1.5 -right-1.5 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 cursor-pointer"
                    >
                      <X width={10} height={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {totalImages < MAX_IMAGES && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-gray-300 rounded-lg px-3 py-4 flex items-center justify-center gap-2 cursor-pointer hover:border-black transition-colors duration-200 text-gray-500 hover:text-black"
              >
                <ImagePlus width={18} height={18} />
                <span className="text-sm">Add images</span>
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-black text-white py-2 rounded-lg mt-1 hover:bg-[#1d1d1d] transition-colors duration-200 cursor-pointer font-medium ${
              isPending ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCarModal;
