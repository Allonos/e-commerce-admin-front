import { useGetAdminsCarsServiceQuery } from "../services/react-query/homePage/query/useGetAdminsCarsServiceQuery";
import { useDeleteCarServiceMutation } from "../services/react-query/homePage/mutation/useDeleteCarServiceMutation";
import { useState } from "react";
import DeleteCarModal from "../components/ui/modals/DeleteCarModal";
import EditCarModal from "../components/ui/modals/EditCarModal";
import type { Car } from "../utils/types/carTypes";
import HomePageSkeleton from "../components/ui/skeletons/HomePageSkeleton";
import HomePageHeader from "../components/ui/headers/homePage/HomePageHeader";
import AllCars from "../components/ui/lists/AllCars";
import DefaultPagination from "../components/ui/pagination/DefaultPagination";

const HomePage = () => {
  const [carToDelete, setCarToDelete] = useState<string | null>(null);
  const [carToEdit, setCarToEdit] = useState<Car | null>(null);

  const [page, setPage] = useState(1);
  const { data: cars, isLoading } = useGetAdminsCarsServiceQuery(page);

  const { mutate: deleteCarMutate, isPending } = useDeleteCarServiceMutation();

  if (isLoading) {
    return <HomePageSkeleton />;
  }

  const noCars = cars?.cars.length === 0;

  const handleConfirmDelete = () => {
    if (!carToDelete) return;
    deleteCarMutate(carToDelete, { onSettled: () => setCarToDelete(null) });
  };

  return (
    <>
      <HomePageHeader />
      {noCars && (
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <h2 className="text-xl font-semibold">No cars found</h2>
          <p className="text-gray-500">Please add a car to get started.</p>
        </div>
      )}
      <DeleteCarModal
        isOpen={!!carToDelete}
        onClose={() => setCarToDelete(null)}
        onConfirm={handleConfirmDelete}
        isPending={isPending}
      />
      <EditCarModal
        isOpen={!!carToEdit}
        onClose={() => setCarToEdit(null)}
        car={carToEdit}
      />
      <AllCars
        cars={cars}
        setCarToEdit={setCarToEdit}
        setCarToDelete={setCarToDelete}
      />
      <DefaultPagination cars={cars} setPage={setPage} />
    </>
  );
};

export default HomePage;
