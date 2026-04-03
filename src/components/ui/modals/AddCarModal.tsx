import { useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { usePostCarServiceMutation } from "../../../services/react-query/createCar/mutation/usePostCarServiceMutation";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MAX_IMAGES = 4;

const AddCarModal = ({ isOpen, onClose }: Props) => {
  const [model, setModel] = useState("");
  const [price, setPrice] = useState<number>();
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formattedDate = date ? dayjs(date).format("YYYY") : "";

  const { mutate: postCarMutate, isPending } = usePostCarServiceMutation();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selected = Array.from(e.target.files);
    const combined = [...images, ...selected];

    if (combined.length > MAX_IMAGES) {
      toast.error(`You can only upload up to ${MAX_IMAGES} images.`);
      e.target.value = "";
      return;
    }

    const newPreviews = selected.map((file) => URL.createObjectURL(file));
    setImages(combined);
    setPreviews((prev) => [...prev, ...newPreviews]);
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClose = () => {
    previews.forEach((url) => URL.revokeObjectURL(url));
    setModel("");
    setPrice(undefined);
    setLocation("");
    setDate("");
    setImages([]);
    setPreviews([]);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!model || !price || !location || !date) {
      toast.error("All fields are required.");
      return;
    }

    if (images.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    if (images.length > MAX_IMAGES) {
      toast.error(`You can only upload up to ${MAX_IMAGES} images.`);
      return;
    }

    postCarMutate({
      images,
      model,
      year: date,
      price: Number(price),
      location,
    }, {
      onSuccess: () => {
        toast.success("Car added successfully!");
        handleClose();
      },
    });
  };

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
          <h2 className="text-xl font-semibold">Add Car</h2>
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
              value={model}
              onChange={(e) => setModel(e.target.value)}
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
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
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
              value={location}
              onChange={(e) => setLocation(e.target.value)}
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
              value={date}
              placeholder="2026"
              onChange={(e) => setDate(e.target.value)}
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
                ({images.length}/{MAX_IMAGES})
              </span>
            </label>

            {previews.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mb-2">
                {previews.map((src, i) => (
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

            {images.length < MAX_IMAGES && (
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
            {isPending ? "Adding..." : "Add Car"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCarModal;
