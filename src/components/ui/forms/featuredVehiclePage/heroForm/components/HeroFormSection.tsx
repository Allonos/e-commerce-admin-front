import { useState } from "react";
import SingleImageUpload from "../../../../modals/SingleImageUpload";
import type {
  HeroVehicle,
  HeroVehiclesResponse,
} from "../../../../../../utils/types/heroVehiclesTypes";
import { useAddHeroVehiclesServiceMutation } from "../../../../../../services/react-query/featuredVehicles/mutation/useAddHeroVehiclesServiceMutation";
import toast from "react-hot-toast";
import HeroVehiclesTable from "./HeroVehiclesTable";

interface IProps {
  heroVehicles: HeroVehiclesResponse | undefined;
  onDelete: (id: string) => void;
  onEdit: (vehicle: HeroVehicle) => void;
}

const HeroFormSection = (
  { heroVehicles, onDelete, onEdit }: IProps,
) => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [tagLine, setTagLine] = useState("");
  const [subtitle, setSubtitle] = useState("");

  const { mutate: addHeroVehicleMutation, isPending } =
    useAddHeroVehiclesServiceMutation();

  const handleImageChange = (file: File | null) => {
    if (preview) URL.revokeObjectURL(preview);
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setPreview(null);
    }
  };

  const handleSave = () => {
    if (!image) {
      toast.error("Please select an image for the hero vehicle.");
      return;
    }
    if (!tagLine || !subtitle) {
      toast.error("All fields are required.");
      return;
    }
    addHeroVehicleMutation({ image, tagLine, subtitle }, {
      onSuccess: () => {
        setImage(null);
        if (preview) URL.revokeObjectURL(preview);
        setPreview(null);
        setTagLine("");
        setSubtitle("");
      },
    });
  };

  return (
    <section className="grid grid-cols-3 gap-10 pt-4">
      <div className="p-6 border border-slate-200 shadow-sm rounded-lg col-span-1">
        <h3 className="text-[18px] text-[#1D293D] font-semibold">
          Add New Hero Car
        </h3>

        <SingleImageUpload
          preview={preview}
          onImageChange={handleImageChange}
        />
        <span className="text-[12px] text-[#62748E]">
          Use a High-resolution landscape image.
        </span>
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
        <button
          onClick={handleSave}
          disabled={isPending}
          className={`self-center w-full bg-slate-900 py-1.5 rounded-lg text-white cursor-pointer hover:bg-slate-800 transition-colors duration-200 ${
            isPending ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isPending ? "Saving..." : "Save Hero Car"}
        </button>
      </div>
      <HeroVehiclesTable
        heroVehicles={heroVehicles}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </section>
  );
};

export default HeroFormSection;
