import { useGetAdminsVehiclesServiceQuery } from "../services/react-query/homePage/query/useGetAdminsVehiclesServiceQuery";
import { useDeleteVehicleServiceMutation } from "../services/react-query/homePage/mutation/useDeleteVehicleServiceMutation";
import { useState } from "react";
import DeleteVehicleModal from "../components/ui/modals/DeleteVehicleModal";
import HomePageSkeleton from "../components/ui/skeletons/HomePageSkeleton";
import HomePageHeader from "../components/ui/headers/homePage/HomePageHeader";
import AllVehicles from "../components/ui/lists/AllVehicles";
import DefaultPagination from "../components/ui/pagination/DefaultPagination";

const HomePage = () => {
  const [vehicleToDelete, setVehicleToDelete] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const { data: vehicles, isLoading } = useGetAdminsVehiclesServiceQuery(page);

  const { mutate: deleteVehicleMutate, isPending } = useDeleteVehicleServiceMutation();

  if (isLoading) {
    return <HomePageSkeleton />;
  }

  const noVehicles = vehicles?.vehicles.length === 0;

  const handleConfirmDelete = () => {
    if (!vehicleToDelete) return;
    deleteVehicleMutate(vehicleToDelete, { onSettled: () => setVehicleToDelete(null) });
  };

  console.log(vehicles);

  return (
    <>
      <HomePageHeader />
      {noVehicles && (
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <h2 className="text-xl font-semibold">No vehicles found</h2>
          <p className="text-gray-500">Please add a vehicle to get started.</p>
        </div>
      )}
      <DeleteVehicleModal
        isOpen={!!vehicleToDelete}
        onClose={() => setVehicleToDelete(null)}
        onConfirm={handleConfirmDelete}
        isPending={isPending}
      />
      <AllVehicles
        vehicles={vehicles}
        setVehicleToDelete={setVehicleToDelete}
      />
      <DefaultPagination vehicles={vehicles} setPage={setPage} />
    </>
  );
};

export default HomePage;
