import { useNavigate, useParams } from "react-router";
import { useGetVehicleByIdServiceQuery } from "../services/react-query/homePage/query/useGetVehicleByIdServiceQuery";
import { useState } from "react";
import { useDeleteVehicleServiceMutation } from "../services/react-query/homePage/mutation/useDeleteVehicleServiceMutation";
import DeleteVehicleModal from "../components/ui/modals/DeleteVehicleModal";
import { useAuthStore } from "../store/useAuthStore";
import ProductDetails from "../components/ui/product/ProductDetails";
import ProductDetailPageSkeleton from "../components/ui/skeletons/ProductDetailPageSkeleton";
import ProductDetailHeader from "../components/ui/headers/productDetailPage/ProductDetailHeader";

const ProductDetailPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const { data: vehicle, isLoading, isError } = useGetVehicleByIdServiceQuery(
    productId,
  );
  const [vehicleToDelete, setVehicleToDelete] = useState<string | null>(null);

  const { authUser } = useAuthStore();

  const { mutate: deleteVehicleMutate, isPending } = useDeleteVehicleServiceMutation();

  const handleConfirmDelete = () => {
    if (!vehicleToDelete) return;
    deleteVehicleMutate(vehicleToDelete, { onSuccess: () => navigate("/") });
  };

  if (isLoading) {
    return <ProductDetailPageSkeleton />;
  }

  if (isError || !vehicle?.vehicle) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <h2 className="text-[28px] font-semibold text-[#0A0A0A]">
          Vehicle not found
        </h2>
        <p className="text-gray-500">
          This vehicle may have been deleted or the link is invalid.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-2 px-6 py-2 bg-[#0A0A0A] text-white rounded-lg hover:bg-[#333] transition-colors duration-200 cursor-pointer"
        >
          Go back home
        </button>
      </div>
    );
  }

  const images = vehicle?.vehicle?.images ?? [];
  const vehicleDetails = vehicle?.vehicle;

  return (
    <>
      <DeleteVehicleModal
        isOpen={!!vehicleToDelete}
        onClose={() => setVehicleToDelete(null)}
        onConfirm={handleConfirmDelete}
        isPending={isPending}
      />
      <ProductDetailHeader />
      <ProductDetails
        vehicleDetails={vehicleDetails}
        authUser={authUser}
        setVehicleToDelete={setVehicleToDelete}
        images={images}
        productId={productId}
      />
    </>
  );
};

export default ProductDetailPage;
