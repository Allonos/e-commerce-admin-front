import { useNavigate, useParams } from "react-router";
import { useGetCarByIdServiceQuery } from "../services/react-query/homePage/query/useGetCarByIdServiceQuery";
import MainLayout from "../components/ui/layout/MainLayout";
import { useState } from "react";
import { useDeleteCarServiceMutation } from "../services/react-query/homePage/mutation/useDeleteCarServiceMutation";
import DeleteCarModal from "../components/ui/modals/DeleteCarModal";
import EditCarModal from "../components/ui/modals/EditCarModal";
import { useAuthStore } from "../store/useAuthStore";
import ProductDetails from "../components/ui/product/ProductDetails";
import ProductDetailPageSkeleton from "../components/ui/skeletons/ProductDetailPageSkeleton";

const ProductDetailPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const { data: car, isLoading, isError } = useGetCarByIdServiceQuery(
    productId,
  );
  const [carToDelete, setCarToDelete] = useState<string | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { authUser } = useAuthStore();

  const { mutate: deleteCarMutate, isPending } = useDeleteCarServiceMutation();

  const handleConfirmDelete = () => {
    if (!carToDelete) return;
    deleteCarMutate(carToDelete, { onSuccess: () => navigate("/") });
  };

  if (isLoading) {
    return <ProductDetailPageSkeleton />;
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
      <ProductDetails
        carDetails={carDetails}
        authUser={authUser}
        setCarToDelete={setCarToDelete}
        setIsEditOpen={setIsEditOpen}
        images={images}
        productId={productId}
      />
    </MainLayout>
  );
};

export default ProductDetailPage;
