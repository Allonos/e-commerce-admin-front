import { ArrowLeft } from "lucide-react";
import { Select } from "antd";
import ImageUploadSection from "../components/ui/modals/ImageUploadSection";
import type { AddVehicleFormProps } from "../utils/types/vehicleFormProps";

const inputCls =
  "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors duration-200";
const labelCls = "block text-sm font-medium text-gray-700 mb-1";

const AddVehicleForm = ({
  make,
  model,
  price,
  location,
  date,
  type,
  lot,
  images,
  previews,
  fileInputRef,
  formattedDate,
  isPending,
  makesOptions,
  modelsOptions,
  typesOptions,
  dispatch,
  handleImageChange,
  removeImage,
  handleClose,
  handleSubmit,
}: AddVehicleFormProps) => {
  return (
    <div className="w-full px-4 py-8">
      <button
        onClick={handleClose}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-black transition-colors duration-200 mb-6 cursor-pointer"
      >
        <ArrowLeft width={16} height={16} />
        Back
      </button>

      <h1 className="text-2xl font-semibold mb-6">Add Vehicle</h1>

      <form
        className="flex flex-col gap-4 mx-auto w-full"
        onSubmit={handleSubmit}
      >
        <div>
          <label className={labelCls}>Make</label>
          <Select
            value={make || undefined}
            onChange={(value) => {
              dispatch({ type: "SET_MAKE", payload: value });
              dispatch({ type: "SET_MODEL", payload: "" });
            }}
            options={makesOptions}
            placeholder="Select a make"
            className="w-full add-select"
          />
        </div>

        <div>
          <label className={labelCls}>Model</label>
          <Select
            value={model || undefined}
            onChange={(value) =>
              dispatch({ type: "SET_MODEL", payload: value })}
            options={modelsOptions}
            placeholder={make ? "Select a model" : "Select a make first"}
            disabled={!make}
            className="w-full add-select"
          />
        </div>

        <div>
          <label className={labelCls}>Type</label>
          <Select
            value={type || undefined}
            onChange={(value) => dispatch({ type: "SET_TYPE", payload: value })}
            options={typesOptions}
            placeholder="Select a type"
            className="w-full add-select"
          />
        </div>

        <div>
          <label className={labelCls}>Price</label>
          <input
            type="text"
            value={price ?? ""}
            onChange={(e) =>
              dispatch({ type: "SET_PRICE", payload: Number(e.target.value) })}
            placeholder="e.g. 42990"
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls}>Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) =>
              dispatch({ type: "SET_LOCATION", payload: e.target.value })}
            placeholder="e.g. San Francisco, CA"
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls}>Date</label>
          <input
            type="text"
            value={date}
            placeholder="2026"
            onChange={(e) =>
              dispatch({ type: "SET_DATE", payload: e.target.value })}
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
            value={lot}
            placeholder="e.g. LOT-001"
            onChange={(e) =>
              dispatch({ type: "SET_LOT", payload: e.target.value })}
            className={inputCls}
          />
        </div>

        <ImageUploadSection
          images={images}
          previews={previews}
          fileInputRef={fileInputRef}
          onRemove={removeImage}
          onImageChange={handleImageChange}
        />

        <button
          type="submit"
          className={`w-full bg-black text-white py-2 rounded-lg mt-1 hover:bg-[#1d1d1d] transition-colors duration-200 font-medium ${
            isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={isPending}
        >
          {isPending ? "Adding..." : "Add Vehicle"}
        </button>
      </form>
    </div>
  );
};

export default AddVehicleForm;
