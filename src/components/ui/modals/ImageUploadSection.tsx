import { ImagePlus, X } from "lucide-react";
import { MAX_IMAGES } from "./useAddCarForm";

interface Props {
  images: File[];
  previews: string[];
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onRemove: (index: number) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  totalCount?: number;
}

const ImageUploadSection = (
  { images, previews, fileInputRef, onRemove, onImageChange, totalCount }: Props,
) => {
  const count = totalCount ?? images.length;
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Images{" "}
        <span className="text-gray-400 font-normal">
          ({count}/{MAX_IMAGES})
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
                  onRemove(i)}
                className="absolute -top-1.5 -right-1.5 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 cursor-pointer"
              >
                <X width={10} height={10} />
              </button>
            </div>
          ))}
        </div>
      )}

      {count < MAX_IMAGES && (
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
        onChange={onImageChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUploadSection;
