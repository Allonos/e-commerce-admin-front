import { useGetAdminsVehiclesServiceQuery } from "../services/react-query/homePage/query/useGetAdminsVehiclesServiceQuery";
import { useDeleteVehicleServiceMutation } from "../services/react-query/homePage/mutation/useDeleteVehicleServiceMutation";
import { useState } from "react";
import DeleteModal from "../components/ui/modals/DeleteModal";
import HomePageSkeleton from "../components/ui/skeletons/HomePageSkeleton";
import HomePageHeader from "../components/ui/headers/homePage/HomePageHeader";
import AllVehicles from "../components/ui/lists/AllVehicles";

const HomePage = () => {
  const [vehicleToDelete, setVehicleToDelete] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: vehicles, isLoading } = useGetAdminsVehiclesServiceQuery(
    page,
    pageSize,
  );
  const { mutate: deleteVehicleMutate, isPending } =
    useDeleteVehicleServiceMutation();

  if (isLoading) {
    return <HomePageSkeleton />;
  }

  const noVehicles = vehicles?.vehicles.length === 0;

  const handleConfirmDelete = (id: string) => {
    deleteVehicleMutate(id, {
      onSettled: () => setVehicleToDelete(null),
    });
  };

  return (
    <>
      <HomePageHeader />
      {noVehicles
        ? (
          <div className="flex flex-col items-center justify-center gap-4 py-20">
            <h2 className="text-xl font-semibold">No vehicles found</h2>
            <p className="text-gray-500">
              Please add a vehicle to get started.
            </p>
          </div>
        )
        : (
          <AllVehicles
            vehicles={vehicles}
            setVehicleToDelete={setVehicleToDelete}
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={(size) => {
              setPageSize(size);
              setPage(1);
            }}
          />
        )}
      <DeleteModal
        title="this vehicle"
        id={vehicleToDelete ?? ""}
        isOpen={!!vehicleToDelete}
        onClose={() => setVehicleToDelete(null)}
        onConfirm={handleConfirmDelete}
        isPending={isPending}
      />
    </>
  );
};

export default HomePage;
