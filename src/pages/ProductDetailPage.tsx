import { useNavigate, useParams } from "react-router";
import { useGetCarByIdServiceQuery } from "../services/react-query/homePage/query/useGetCarByIdServiceQuery";
import MainLayout from "../components/ui/layout/MainLayout";
import { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  MapPin,
  Pencil,
  Trash,
} from "lucide-react";
import { Carousel } from "antd";
import type { CarouselRef } from "antd/es/carousel";
import { useDeleteCarServiceMutation } from "../services/react-query/homePage/mutation/useDeleteCarServiceMutation";
import DeleteCarModal from "../components/ui/modals/DeleteCarModal";
import EditCarModal from "../components/ui/modals/EditCarModal";
import { useAuthStore } from "../store/useAuthStore";

const ProductDetailPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const { data: car, isLoading, isError } = useGetCarByIdServiceQuery(
    productId,
  );
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [carToDelete, setCarToDelete] = useState<string | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const carouselRef = useRef<CarouselRef>(null);

  const { authUser } = useAuthStore();

  const { mutate: deleteCarMutate, isPending } = useDeleteCarServiceMutation();

  const handleConfirmDelete = () => {
    if (!carToDelete) return;
    deleteCarMutate(carToDelete, { onSuccess: () => navigate("/") });
  };

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (isError || !car?.car) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-96 gap-4">
          <h2 className="text-[28px] font-semibold text-[#0A0A0A]">
            Car not found
          </h2>
          <p className="text-gray-500">
            This car may have been deleted or the link is invalid.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-2 px-6 py-2 bg-[#0A0A0A] text-white rounded-lg hover:bg-[#333] transition-colors duration-200 cursor-pointer"
          >
            Go back home
          </button>
        </div>
      </MainLayout>
    );
  }

  const images = car?.car?.images ?? [];
  const carDetails = car?.car;

  return (
    <MainLayout>
      <DeleteCarModal
        isOpen={!!carToDelete}
        onClose={() => setCarToDelete(null)}
        onConfirm={handleConfirmDelete}
        isPending={isPending}
      />
      <EditCarModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        car={carDetails ?? null}
      />
      <div className="flex flex-col items-center xl:flex-row xl:items-start gap-4">
        <div className="w-full xl:w-350 px-2 xl:px-0 relative overflow-hidden">
          <div>
            <Carousel
              ref={carouselRef}
              afterChange={(index) => setActiveIndex(index)}
              dots={false}
            >
              {images.map((src: string, i: number) => (
                <img
                  key={i}
                  src={src}
                  alt={"car image"}
                  className={`w-full max-w-full xl:max-w-350 h-100 xl:h-125 object-cover rounded-lg`}
                />
              ))}
            </Carousel>
            {images.length > 1 && (
              <>
                <div
                  onClick={() => carouselRef.current?.prev()}
                  className="absolute top-1/2 left-4 bg-[#000000B3] p-2 rounded-full cursor-pointer hover:bg-[#000000d9] transition-colors duration-200"
                >
                  <ArrowLeft color="white" />
                </div>
                <div
                  onClick={() => carouselRef.current?.next()}
                  className="absolute top-1/2 right-4 bg-[#000000B3] p-2 rounded-full cursor-pointer hover:bg-[#000000d9] transition-colors duration-200"
                >
                  <ArrowRight color="white" />
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center h-7 px-3 gap-2 shadow-lg">
                  {images.map((_: string, i: number) => (
                    <div
                      onClick={() => carouselRef.current?.goTo(i)}
                      className={`h-3 w-3 rounded-full ${
                        i === activeIndex ? "bg-white shadow-sm" : "bg-white/50"
                      } transition-colors cursor-pointer`}
                      key={i}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="w-full px-2 xl:px-0">
          <div className="flex flex-col gap-4 justify-between w-full">
            <h2 className="text-[24px] font-semibold text[#0A0A0A]">
              {carDetails?.model}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-[20px] text-gray-600">Price:</span>
              <h2 className="text-[30px] text-[#0A0A0A] font-semibold">
                ${carDetails?.price}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[16px] text-gray-600">
                By:
              </span>
              <h4 className="text-[16px]">{carDetails?.owner.username}</h4>
            </div>

            <div className="flex gap-2 w-full mt-4">
              <div className="bg-[#ECECF0] w-full rounded-lg px-4 py-2 flex items-center gap-2">
                <MapPin width={25} height={25} color="#717182" />
                <div>
                  <span className="text-[14px] text-[#717182]">Location</span>
                  <h3 className="text-[16px]">{carDetails?.location}</h3>
                </div>
              </div>
              <div className="bg-[#ECECF0] w-full rounded-lg px-4 py-2 flex items-center gap-2">
                <Calendar width={25} height={25} color="#717182" />
                <div>
                  <span className="text-[14px] text-[#717182]">
                    Manufacture Year
                  </span>
                  <h3 className="text-[16px]">{carDetails?.year}</h3>
                </div>
              </div>
            </div>

            {carDetails?.owner.id === authUser?.id && (
              <div className="w-full flex xl:flex-row flex-col gap-2 mt-4">
                <div
                  onClick={() => setIsEditOpen(true)}
                  className="flex items-center justify-center w-full bg-[#ECECF0] gap-2 rounded-lg py-2 cursor-pointer hover:bg-[#d5d5d5] transition-colors duration-200"
                >
                  <Pencil width={20} height={20} color="#717182" />
                  <div>
                    <span className="text-[14px] text-[#717182]">
                      Edit
                    </span>
                  </div>
                </div>
                <div
                  onClick={() => productId && setCarToDelete(productId)}
                  className=" bg-[#d4183d] hover:bg-[#cf3d5a] transition-colors duration-200 cursor-pointer w-full rounded-lg px-4 py-2 flex items-center justify-center gap-2"
                >
                  <Trash width={20} height={20} color="white" />
                  <div>
                    <span className="text-[16px] text-white font-semibold">
                      Delete
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetailPage;
