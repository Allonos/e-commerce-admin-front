import { useGetAdminsVehiclesServiceQuery } from "../services/react-query/homePage/query/useGetAdminsVehiclesServiceQuery";
import { useDeleteVehicleServiceMutation } from "../services/react-query/homePage/mutation/useDeleteVehicleServiceMutation";
import { useState } from "react";
import DeleteModal from "../components/ui/modals/DeleteModal";
import HomePageHeader from "../components/ui/headers/homePage/HomePageHeader";
import AllVehicles from "../components/ui/lists/AllVehicles";
import VehicleFilters from "../components/ui/forms/vehicleFilters/VehicleFilters";
import type { VehicleQueryParams } from "../services/apiServices/getAdminsVehicles";
import type { VehicleSortParams } from "../components/ui/lists/useVehiclesTableState";

const HomePage = () => {
  const [vehicleToDelete, setVehicleToDelete] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filterParams, setFilterParams] = useState<VehicleQueryParams>({});

  const { data: vehicles, isFetching } = useGetAdminsVehiclesServiceQuery(
    page,
    pageSize,
    filterParams,
  );
  const { mutate: deleteVehicleMutate, isPending } =
    useDeleteVehicleServiceMutation();

  const noVehicles = vehicles?.vehicles.length === 0;

  const handleConfirmDelete = (id: string) => {
    deleteVehicleMutate(id, {
      onSettled: () => setVehicleToDelete(null),
    });
  };

  const handleSearch = (filters: VehicleQueryParams) => {
    setPage(1);
    setFilterParams((prev) => {
      const { sortBy, sortOrder, featured } = prev;
      return {
        ...(sortBy !== undefined && { sortBy }),
        ...(sortOrder !== undefined && { sortOrder }),
        ...(featured !== undefined && { featured }),
        ...filters,
      };
    });
  };

  const handleReset = () => {
    setPage(1);
    setFilterParams({});
  };

  const handleSortChange = (sort: VehicleSortParams) => {
    setFilterParams((prev) => ({
      ...prev,
      sortBy: sort.sortBy,
      sortOrder: sort.sortOrder,
    }));
  };

  return (
    <>
      <HomePageHeader />
      <VehicleFilters onSearch={handleSearch} onReset={handleReset} />
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
            isFetching={isFetching}
            setVehicleToDelete={setVehicleToDelete}
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={(size) => {
              setPageSize(size);
              setPage(1);
            }}
            onSortChange={handleSortChange}
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
