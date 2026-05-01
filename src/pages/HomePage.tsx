import { Calendar, MapPin, Pencil, Trash } from "lucide-react";
import { useGetAdminsCarsServiceQuery } from "../services/react-query/homePage/query/useGetAdminsCarsServiceQuery";
import { useAuthStore } from "../store/useAuthStore";
import { useDeleteCarServiceMutation } from "../services/react-query/homePage/mutation/useDeleteCarServiceMutation";
import { useState } from "react";
import DeleteCarModal from "../components/ui/modals/DeleteCarModal";
import EditCarModal from "../components/ui/modals/EditCarModal";
import { Link } from "react-router";
import type { Car } from "../utils/types/carTypes";
import HomePageSkeleton from "../components/ui/skeletons/HomePageSkeleton";
import HomePageHeader from "../components/ui/headers/homePage/HomePageHeader";

const getPageNumbers = (
  currentPage: number,
  totalPages: number,
): (number | "...")[] => {
  const delta = 3;
  const pageSet = new Set<number>();

  pageSet.add(1);

  for (
    let i = Math.max(1, currentPage - delta);
    i <= Math.min(totalPages, currentPage + delta);
    i++
  ) {
    pageSet.add(i);
  }

  for (let i = Math.max(1, totalPages - 2); i <= totalPages; i++) {
    pageSet.add(i);
  }

  const sorted = Array.from(pageSet).sort((a, b) => a - b);
  const result: (number | "...")[] = [];

  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push("...");
    result.push(sorted[i]);
  }

  return result;
};

const HomePage = () => {
  const [carToDelete, setCarToDelete] = useState<string | null>(null);
  const [carToEdit, setCarToEdit] = useState<Car | null>(null);
  const [page, setPage] = useState(1);
  const { authUser } = useAuthStore();

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
      <div className="grid grid-cols-2 2xl:grid-cols-3 w-full gap-6 lg:max-w-250 2xl:max-w-400 mx-auto px-4 pb-10">
        {cars?.cars.map((car) => (
          <div
            className="flex gap-6 self-start"
            key={car.id}
          >
            <div className="rounded-2xl w-full relative shadow-md hover:shadow-xl cursor-pointer transition-shadow duration-200 overflow-hidden">
              {car.images.length > 1 && (
                <div className="absolute top-3 right-3 bg-[#0a0a0ae8] text-white px-2 py-1 rounded">
                  <h2 className="text-sm">+{car.images.length - 1} more</h2>
                </div>
              )}
              <div className="absolute top-3 left-3 bg-[#0a0a0ae8] text-white px-2 py-1 rounded">
                <h2 className="text-sm">{car.lot}</h2>
              </div>
              <Link to={`/product/${car.id}`}>
                <div className="h-75 w-full">
                  <img
                    src={car.images[0]}
                    alt={car.model}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="pb-2 pt-3 px-4 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-semibold">{car.makes}</p>
                    <h2 className="text-lg font-semibold">{car.model}</h2>
                  </div>
                  <h3>${car.price}</h3>
                  <div className="pt-2 flex items-center gap-2">
                    <MapPin width={16} height={16} color="#717182" />
                    <span className="text-sm text-[#717182]">
                      {car.location}
                    </span>
                  </div>
                  <div className="pt-2 flex items-center gap-2">
                    <Calendar width={16} height={16} color="#717182" />
                    <span className="text-sm text-[#717182]">
                      manufacture year: {car.year}
                    </span>
                  </div>
                  <div className="pt-2 flex items-center gap-2">
                    <Calendar width={16} height={16} color="#717182" />
                    <span className="text-sm text-[#717182]">
                      By: {car.owner.username}
                    </span>
                  </div>
                </div>
              </Link>
              {authUser?.id === car.owner.id && (
                <div className="flex justify-between w-full gap-4 p-4">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setCarToEdit(car);
                    }}
                    className="flex items-center justify-center w-full bg-[#ECECF0] gap-2 rounded-lg py-2 cursor-pointer hover:bg-[#d5d5d5] transition-colors duration-200"
                  >
                    <Pencil width={18} height={18} />
                    <span className="text-md hidden sm:inline">Edit</span>
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setCarToDelete(car.id);
                    }}
                    className="flex items-center justify-center w-full bg-[#d4183d] gap-2 rounded-lg py-2 cursor-pointer hover:bg-[#cf3d5a] transition-colors duration-200"
                  >
                    <Trash width={18} height={18} color="#fff" />
                    <span className="text-md text-white font-semibold hidden sm:inline">
                      Delete
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* PAGINATION */}
      {cars && cars.totalPages > 1 && (
        <div className="flex items-center justify-center gap-1 px-4 pb-10">
          {getPageNumbers(cars.page, cars.totalPages).map((p, i) =>
            p === "..."
              ? (
                <span
                  key={`ellipsis-${i}`}
                  className="w-9 h-9 flex items-center justify-center text-sm text-gray-400 select-none"
                >
                  …
                </span>
              )
              : (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer ${
                    p === cars.page
                      ? "bg-blue-500 text-white"
                      : "bg-[#ECECF0] hover:bg-[#d5d5d5]"
                  }`}
                >
                  {p}
                </button>
              )
          )}
        </div>
      )}
    </>
  );
};

export default HomePage;
