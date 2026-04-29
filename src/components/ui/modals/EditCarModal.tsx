import { X } from "lucide-react";
import { useEditCarForm } from "./useEditCarForm";
import ImageUploadSection from "./ImageUploadSection";
import type { Car } from "../../../utils/types/carTypes";

const inputCls =
  "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors duration-200";
const labelCls = "block text-sm font-medium text-gray-700 mb-1";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  car: Car | null;
}

const EditCarModal = ({ isOpen, onClose, car }: Props) => {
  const {
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
  } = useEditCarForm(car, onClose);

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
            <label className={labelCls}>Make</label>
            <input
              type="text"
              value={form.makes}
              onChange={(e) => setForm((prev) => ({ ...prev, makes: e.target.value }))}
              placeholder="e.g. Tesla"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Model</label>
            <input
              type="text"
              value={form.model}
              onChange={(e) => setForm((prev) => ({ ...prev, model: e.target.value }))}
              placeholder="e.g. Model 3"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Price</label>
            <input
              type="number"
              value={form.price ?? ""}
              onChange={(e) => setForm((prev) => ({ ...prev, price: Number(e.target.value) }))}
              placeholder="e.g. 42990"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Location</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
              placeholder="e.g. San Francisco, CA"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Date</label>
            <input
              type="text"
              value={form.date}
              placeholder="2026"
              onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
              className={inputCls}
            />
            {formattedDate && (
              <p className="text-xs text-gray-400 mt-1">{formattedDate}</p>
            )}
          </div>
          <div>
            <label className={labelCls}>Type</label>
            <input
              type="text"
              value={form.type}
              placeholder="e.g. Sedan"
              onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Lot</label>
            <input
              type="text"
              value={form.lot}
              placeholder="e.g. LOT-001"
              onChange={(e) => setForm((prev) => ({ ...prev, lot: e.target.value }))}
              className={inputCls}
            />
          </div>

          <ImageUploadSection
            images={newImages}
            previews={allPreviews}
            fileInputRef={fileInputRef}
            onRemove={removeImage}
            onImageChange={handleImageChange}
            totalCount={totalImages}
          />

          <button
            type="submit"
            className={`w-full bg-black text-white py-2 rounded-lg mt-1 hover:bg-[#1d1d1d] transition-colors duration-200 font-medium ${
              isPending || !hasChanges
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            disabled={isPending || !hasChanges}
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCarModal;
