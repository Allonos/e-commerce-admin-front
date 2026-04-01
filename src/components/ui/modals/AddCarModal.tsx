import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import dayjs from "dayjs";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddCarModal = ({ isOpen, onClose }: Props) => {
  const [carName, setCarName] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formattedDate = date ? dayjs(date).format("MMM D, YYYY") : "";

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleClose = () => {
    setCarName("");
    setPrice("");
    setLocation("");
    setDate("");
    setImages([]);
    onClose();
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

        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Car Name
            </label>
            <input
              type="text"
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
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
              onChange={(e) => setPrice(e.target.value)}
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
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors duration-200"
            />
            {formattedDate && (
              <p className="text-xs text-gray-400 mt-1">{formattedDate}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Images
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg px-3 py-6 flex flex-col items-center gap-2 cursor-pointer hover:border-black transition-colors duration-200"
            >
              <Upload width={24} height={24} className="text-gray-400" />
              <p className="text-sm text-gray-500">
                {images.length > 0
                  ? `${images.length} file${
                    images.length > 1 ? "s" : ""
                  } selected`
                  : "Click to upload images"}
              </p>
            </div>
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
            className="w-full bg-black text-white py-2 rounded-lg mt-1 hover:bg-[#1d1d1d] transition-colors duration-200 cursor-pointer font-medium"
          >
            Add Car
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCarModal;
