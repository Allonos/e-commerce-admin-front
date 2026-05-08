import { Calendar, CarFront, MapPin, Pencil, Trash } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../../../store/useAuthStore";
import type { VehicleResponse } from "../../../utils/types/vehicleTypes";

interface IProps {
  vehicles: VehicleResponse | undefined;
  setVehicleToDelete: (id: string | null) => void;
}

const AllVehicles = ({ vehicles, setVehicleToDelete }: IProps) => {
  const { authUser } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 2xl:grid-cols-3 w-full gap-6 lg:max-w-250 2xl:max-w-400 mx-auto px-4 pb-10">
      {vehicles?.vehicles.map((vehicle) => (
        <div
          className="flex gap-6 self-start"
          key={vehicle.id}
        >
          <div className="rounded-2xl w-full relative shadow-md hover:shadow-xl cursor-pointer transition-shadow duration-200 overflow-hidden">
            {vehicle.images.length > 1 && (
              <div className="absolute top-3 right-3 bg-[#0a0a0ae8] text-white px-2 py-1 rounded">
                <h2 className="text-sm">+{vehicle.images.length - 1} more</h2>
              </div>
            )}
            <div className="absolute top-3 left-3 bg-[#0a0a0ae8] text-white px-2 py-1 rounded">
              <h2 className="text-sm">{vehicle.lot}</h2>
            </div>
            <Link to={`/product/${vehicle.id}`}>
              <div className="h-75 w-full">
                <img
                  src={vehicle.images[0]}
                  alt={vehicle.model.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="pb-2 pt-3 px-4 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold capitalize">
                    {vehicle.make.name}
                  </p>
                  <h2 className="text-lg font-semibold capitalize">
                    {vehicle.model.name}
                  </h2>
                </div>
                <h3>${vehicle.price}</h3>
                <h3 className="text-sm text-[#717182]">
                  Status: {vehicle.status}
                </h3>
                <div className="pt-2 flex items-center gap-2">
                  <CarFront width={16} height={16} color="#717182" />
                  <span className="text-sm text-[#717182] capitalize">
                    Body Type: {vehicle.type.name}
                  </span>
                </div>
                <div className="pt-2 flex items-center gap-2">
                  <MapPin width={16} height={16} color="#717182" />
                  <span className="text-sm text-[#717182]">
                    {vehicle.location}
                  </span>
                </div>
                <div className="pt-2 flex items-center gap-2">
                  <Calendar width={16} height={16} color="#717182" />
                  <span className="text-sm text-[#717182]">
                    Manufacture year: {vehicle.year}
                  </span>
                </div>
                <div className="pt-2 flex items-center gap-2">
                  <Calendar width={16} height={16} color="#717182" />
                  <span className="text-sm text-[#717182]">
                    By: {vehicle.owner.username}
                  </span>
                </div>
              </div>
            </Link>
            {authUser?.id === vehicle.owner.id && (
              <div className="flex justify-between w-full gap-4 p-4">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/vehicles/edit/${vehicle.id}`);
                  }}
                  className="flex items-center justify-center w-full bg-[#ECECF0] gap-2 rounded-lg py-2 cursor-pointer hover:bg-[#d5d5d5] transition-colors duration-200"
                >
                  <Pencil width={18} height={18} />
                  <span className="text-md hidden sm:inline">Edit</span>
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setVehicleToDelete(vehicle.id);
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
  );
};

export default AllVehicles;
