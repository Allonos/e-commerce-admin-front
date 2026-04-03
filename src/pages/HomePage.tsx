import { Calendar, MapPin, Pencil, Trash } from "lucide-react";
import MainLayout from "../components/ui/layout/MainLayout";
import { useGetAdminsCarsServiceQuery } from "../services/react-query/homePage/query/useGetAdminsCarsServiceQuery";
import { useAuthStore } from "../store/useAuthStore";
import { useDeleteCarServiceMutation } from "../services/react-query/homePage/mutation/useDeleteCarServiceMutation";
import { useState } from "react";
import DeleteCarModal from "../components/ui/modals/DeleteCarModal";

const HomePage = () => {
  const [carToDelete, setCarToDelete] = useState<string | null>(null);
  const { data: cars, isLoading } = useGetAdminsCarsServiceQuery();
  const { authUser } = useAuthStore();

  const { mutate: deleteCarMutate, isPending } = useDeleteCarServiceMutation();

  console.log(cars);

  const noCars = !isLoading && cars?.cars.length === 0;

  if (noCars) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <h2 className="text-xl font-semibold">No cars found</h2>
          <p className="text-gray-500">Please add a car to get started.</p>
        </div>
      </MainLayout>
    );
  }

  const handleConfirmDelete = () => {
    if (!carToDelete) return;
    deleteCarMutate(carToDelete, { onSettled: () => setCarToDelete(null) });
  };

  return (
    <MainLayout>
      <DeleteCarModal
        isOpen={!!carToDelete}
        onClose={() => setCarToDelete(null)}
        onConfirm={handleConfirmDelete}
        isPending={isPending}
      />
      <div className="pt-10 grid grid-cols-2 lg:grid-cols-3 gap-6">
        {!isLoading &&
          cars?.cars.map((car) => (
            <div className="flex gap-6 relative" key={car.id}>
              <div className="rounded-2xl lg:w-90 xl:w-97.5 shadow-md hover:shadow-xl cursor-pointer transition-shadow duration-200 overflow-hidden">
                <div className="h-75 w-full">
                  <img
                    src={car.images[0]}
                    alt={car.model}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="pb-2 pt-3 px-4 flex flex-col gap-2">
                  <h2 className="text-lg font-semibold">{car.model}</h2>
                  <h3>${car.price}</h3>
                  <div className="pt-2 flex items-center gap-2">
                    <MapPin width={16} height={16} color="#717182" />
                    <span className="text-sm text-[#717182]">
                      {car.location}
                    </span>
                  </div>
                  <div className="pt-2 flex items-center gap-2">
                    <Calendar width={16} height={16} color="#717182" />
                    <span className="text-sm text-[#717182]">{car.year}</span>
                  </div>
                </div>
                {authUser?.id === car.userId && (
                  <div className="flex justify-between w-full gap-4 p-4">
                    <div className="flex items-center justify-center w-full bg-[#c6c6c6] gap-2 rounded-lg py-2 cursor-pointer hover:bg-[#bcbcbc] transition-colors duration-200">
                      <Pencil width={18} height={18} />
                      <span className="text-md">Edit</span>
                    </div>
                    <div
                      onClick={() =>
                        setCarToDelete(car.id)}
                      className="flex items-center justify-center w-full bg-[#d4183d] gap-2 rounded-lg py-2 cursor-pointer hover:bg-[#cf3d5a] transition-colors duration-200"
                    >
                      <Trash width={18} height={18} color="#fff" />
                      <span className="text-md text-white font-semibold">
                        Delete
                      </span>
                    </div>
                  </div>
                )}
              </div>
              {car.images.length > 1 && (
                <div className="absolute top-2 right-7 bg-[#0a0a0ae8] text-white px-2 py-1 rounded">
                  <h2 className="text-sm">+{car.images.length - 1} more</h2>
                </div>
              )}
            </div>
          ))}
      </div>
    </MainLayout>
  );
};

export default HomePage;
