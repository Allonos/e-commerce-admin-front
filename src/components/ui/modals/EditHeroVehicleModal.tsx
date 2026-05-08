import { Save, X } from "lucide-react";
import SingleImageUpload from "./SingleImageUpload";
import { useState } from "react";
import { useEditHeroVehicleServiceMutation } from "../../../services/react-query/featuredVehicles/mutation/useEditHeroVehicleServiceMutation";
import toast from "react-hot-toast";
import type { HeroVehicle } from "../../../utils/types/heroVehiclesTypes";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  heroVehicle: HeroVehicle;
}

const EditHeroVehicleModal = ({ isOpen, onClose, heroVehicle }: Props) => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(heroVehicle.image);
  const [tagLine, setTagLine] = useState(heroVehicle.tagLine);
  const [subtitle, setSubtitle] = useState(heroVehicle.subtitle);

  const { mutate: editHeroVehicle, isPending } =
    useEditHeroVehicleServiceMutation();

  const handleImageChange = (file: File | null) => {
    if (preview) URL.revokeObjectURL(preview);
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setPreview(heroVehicle.image);
    }
  };

  const hasChanges = !!image ||
    tagLine !== heroVehicle.tagLine ||
    subtitle !== heroVehicle.subtitle;

  const handleSave = () => {
    if (!tagLine || !subtitle) {
      toast.error("All fields are required.");
      return;
    }
    editHeroVehicle(
      { id: heroVehicle.id, image, tagLine, subtitle },
      { onSuccess: onClose },
    );
  };

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-200 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Hero Vehicle</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black transition-colors duration-200 cursor-pointer"
          >
            <X width={20} height={20} />
          </button>
        </div>

        <SingleImageUpload
          preview={preview}
          onImageChange={handleImageChange}
        />

        <div className="py-3 flex flex-col gap-2">
          <label className="block text-sm text-[#314158]">Tag Line</label>
          <input
            type="text"
            className="w-full border border-slate-300 rounded-md p-2 text-[15px]"
            placeholder="e.g. Luxury Cars"
            value={tagLine}
            onChange={(e) => setTagLine(e.target.value)}
          />
        </div>
        <div className="py-3 flex flex-col gap-2">
          <label className="block text-sm text-[#314158]">Subtitle</label>
          <input
            type="text"
            className="w-full border border-slate-300 rounded-md p-2 text-[15px]"
            placeholder="e.g. Bid on luxury cars"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 rounded-lg py-2 text-sm font-medium hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isPending || !hasChanges}
            className={`flex-1 bg-slate-900 text-white rounded-lg py-2 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors duration-200 cursor-pointer ${
              isPending || !hasChanges ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Save width={16} height={16} />
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditHeroVehicleModal;
