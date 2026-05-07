import { ImagePlus, X } from "lucide-react";
import { useRef } from "react";

interface Props {
  preview: string | null;
  onImageChange: (file: File | null) => void;
}

const SingleImageUpload = ({ preview, onImageChange }: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onImageChange(file);
    e.target.value = "";
  };

  return (
    <div className="pt-3 flex flex-col gap-2">
      <label className="block text-sm text-[#314158]">Image</label>

      {preview && (
        <div className="relative group w-full aspect-video">
          <img
            src={preview}
            alt="preview"
            className="w-full h-full object-cover rounded-lg border border-slate-200"
          />
          <button
            type="button"
            onClick={() => onImageChange(null)}
            className="absolute -top-1.5 -right-1.5 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 cursor-pointer"
          >
            <X width={10} height={10} />
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="w-full border-2 border-dashed border-slate-300 rounded-lg px-3 py-4 flex items-center justify-center gap-2 cursor-pointer hover:border-black transition-colors duration-200 text-slate-500 hover:text-black"
      >
        <ImagePlus width={18} height={18} />
        <span className="text-sm">
          {preview ? "Change image" : "Add image"}
        </span>
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
};

export default SingleImageUpload;
