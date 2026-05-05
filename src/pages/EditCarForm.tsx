import { ArrowLeft } from "lucide-react";
import { Select } from "antd";
import ImageUploadSection from "../components/ui/modals/ImageUploadSection";
import type { EditCarFormProps } from "../utils/types/vehicleFormProps";

const inputCls =
  "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors duration-200";
const labelCls = "block text-sm font-medium text-gray-700 mb-1";

const EditCarForm = ({
  form,
  setForm,
  newImages,
  allPreviews,
  fileInputRef,
  formattedDate,
  totalImages,
  hasChanges,
  isPending,
  makesOptions,
  modelsOptions,
  typesOptions,
  handleImageChange,
  removeImage,
  handleClose,
  handleSubmit,
}: EditCarFormProps) => {
  return (
    <div className="w-full px-4 py-8">
      <button
        onClick={handleClose}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-black transition-colors duration-200 mb-6 cursor-pointer"
      >
        <ArrowLeft width={16} height={16} />
        Back
      </button>

      <h1 className="text-2xl font-semibold mb-6">Edit Car</h1>

      <form
        className="flex flex-col gap-4 mx-auto w-full"
        onSubmit={handleSubmit}
      >
        <div>
          <label className={labelCls}>Make</label>
          <Select
            value={form.makes || undefined}
            onChange={(value) => {
              setForm((prev) => ({ ...prev, makes: value, model: "" }));
            }}
            options={makesOptions}
            placeholder="Select a make"
            className="w-full add-select"
          />
        </div>

        <div>
          <label className={labelCls}>Model</label>
          <Select
            value={form.model || undefined}
            onChange={(value) => setForm((prev) => ({ ...prev, model: value }))}
            options={modelsOptions}
            placeholder={form.makes ? "Select a model" : "Select a make first"}
            disabled={!form.makes}
            className="w-full add-select"
          />
        </div>

        <div>
          <label className={labelCls}>Type</label>
          <Select
            value={form.type || undefined}
            onChange={(value) => setForm((prev) => ({ ...prev, type: value }))}
            options={typesOptions}
            placeholder="Select a type"
            className="w-full add-select"
          />
        </div>

        <div>
          <label className={labelCls}>Price</label>
          <input
            type="text"
            value={form.price ?? ""}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, price: Number(e.target.value) }))}
            placeholder="e.g. 42990"
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls}>Location</label>
          <input
            type="text"
            value={form.location}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, location: e.target.value }))}
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
            onChange={(e) =>
              setForm((prev) => ({ ...prev, date: e.target.value }))}
            className={inputCls}
          />
          {formattedDate && (
            <p className="text-xs text-gray-400 mt-1">{formattedDate}</p>
          )}
        </div>

        <div>
          <label className={labelCls}>Lot</label>
          <input
            type="text"
            value={form.lot}
            placeholder="e.g. LOT-001"
            onChange={(e) =>
              setForm((prev) => ({ ...prev, lot: e.target.value }))}
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
  );
};

export default EditCarForm;
