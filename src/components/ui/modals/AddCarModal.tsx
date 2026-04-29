import { X } from "lucide-react";
import { useAddCarForm } from "./useAddCarForm";
import ImageUploadSection from "./ImageUploadSection";
import CarFormFields from "./CarFormFields";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddCarModal = ({ isOpen, onClose }: Props) => {
  const {
    state: { make, model, price, location, date, type, lot, images, previews },
    dispatch,
    fileInputRef,
    formattedDate,
    isPending,
    handleImageChange,
    removeImage,
    handleClose,
    handleSubmit,
  } = useAddCarForm(onClose);

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
          <CarFormFields
            make={make}
            model={model}
            price={price}
            location={location}
            date={date}
            type={type}
            lot={lot}
            formattedDate={formattedDate}
            dispatch={dispatch}
          />

          <ImageUploadSection
            images={images}
            previews={previews}
            fileInputRef={fileInputRef}
            onRemove={removeImage}
            onImageChange={handleImageChange}
          />

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
