import { Image } from "lucide-react";
import { useState } from "react";
import type {
  HeroVehicle,
  HeroVehiclesResponse,
} from "../../../../../utils/types/heroVehiclesTypes";
import { useDeleteHeroVehiclesServiceMutation } from "../../../../../services/react-query/featuredVehicles/mutation/useDeleteHeroVehiclesServiceMutation";
import DeleteModal from "../../../modals/DeleteModal";
import HeroFormSection from "./components/HeroFormSection";
import EditHeroVehicleModal from "../../../modals/EditHeroVehicleModal";

interface IProps {
  heroVehicles: HeroVehiclesResponse | undefined;
}

const HeroForm = ({ heroVehicles }: IProps) => {
  const [heroVehicleToDelete, setHeroVehicleToDelete] = useState<string | null>(
    null,
  );
  const [heroVehicleToEdit, setHeroVehicleToEdit] = useState<
    HeroVehicle | null
  >(null);

  const { mutate: deleteHeroVehicle, isPending: isDeletingHeroVehicle } =
    useDeleteHeroVehiclesServiceMutation();

  const handleConfirmDelete = (id: string) => {
    deleteHeroVehicle(id, {
      onSettled: () => setHeroVehicleToDelete(null),
    });
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <Image className="w-6 h-6" />
        <h2 className="text-[20px] text-[#0F172B] font-bold">
          1. Hero Vehicles
        </h2>
      </div>

      <HeroFormSection
        heroVehicles={heroVehicles}
        onDelete={setHeroVehicleToDelete}
        onEdit={setHeroVehicleToEdit}
      />

      <DeleteModal
        title="this hero vehicle"
        id={heroVehicleToDelete ?? ""}
        isOpen={!!heroVehicleToDelete}
        onClose={() => setHeroVehicleToDelete(null)}
        onConfirm={handleConfirmDelete}
        isPending={isDeletingHeroVehicle}
      />

      {heroVehicleToEdit && (
        <EditHeroVehicleModal
          key={heroVehicleToEdit.id}
          isOpen={!!heroVehicleToEdit}
          onClose={() => setHeroVehicleToEdit(null)}
          heroVehicle={heroVehicleToEdit}
        />
      )}
    </div>
  );
};

export default HeroForm;
