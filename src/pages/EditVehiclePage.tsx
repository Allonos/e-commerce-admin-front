import { useNavigate, useParams } from "react-router";
import { useEditVehicleForm } from "../components/ui/modals/useEditVehicleForm";
import { useGetVehicleByIdServiceQuery } from "../services/react-query/homePage/query/useGetVehicleByIdServiceQuery";
import { useGetMakesServiceQuery } from "../services/react-query/vehicleCategories/query/useGetMakesServiceQuery";
import { useGetModelsServiceQuery } from "../services/react-query/vehicleCategories/query/useGetModelsServiceQuery";
import { useGetTypesServiceQuery } from "../services/react-query/vehicleCategories/query/useGetTypesServiceQuery";
import EditVehiclePageSkeleton from "../components/ui/skeletons/EditVehiclePageSkeleton";
import EditVehicleForm from "../components/ui/forms/EditVehicleForm";

interface Make {
  id: string;
  name: string;
}
interface Model {
  id: string;
  name: string;
  makeId: string;
}
interface TypeItem {
  id: string;
  name: string;
}

const EditVehiclePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: vehicleData, isLoading: vehiclesLoading } =
    useGetVehicleByIdServiceQuery(
      id,
    );
  const vehicle = vehicleData?.vehicle ?? null;

  const {
    form,
    setForm,
    newImages,
    allPreviews,
    fileInputRef,
    formattedDate,
    totalImages,
    hasChanges,
    isPending,
    handleImageChange,
    removeImage,
    handleClose,
    handleSubmit,
  } = useEditVehicleForm(vehicle, () => navigate(-1));

  const { data: makesData, isLoading: makesLoading } =
    useGetMakesServiceQuery();
  const { data: modelsData, isLoading: modelsLoading } =
    useGetModelsServiceQuery(form.makes);
  const { data: typesData, isLoading: typesLoading } =
    useGetTypesServiceQuery();

  const makesArray: Make[] = Array.isArray(makesData)
    ? makesData
    : (makesData as { makes: Make[] })?.makes ?? [];

  const modelsArray: Model[] = Array.isArray(modelsData)
    ? modelsData
    : (modelsData as { models: Model[] })?.models ?? [];

  const typesArray: TypeItem[] = Array.isArray(typesData)
    ? typesData
    : (typesData as { types: TypeItem[] })?.types ?? [];

  const makesOptions = makesArray.map((m) => ({ label: m.name, value: m.id }));
  const modelsOptions = modelsArray.map((m) => ({
    label: m.name,
    value: m.id,
  }));
  const typesOptions = typesArray.map((t) => ({ label: t.name, value: t.id }));

  if (vehiclesLoading || makesLoading || modelsLoading || typesLoading) {
    return <EditVehiclePageSkeleton />;
  }

  return (
    <EditVehicleForm
      form={form}
      setForm={setForm}
      newImages={newImages}
      allPreviews={allPreviews}
      fileInputRef={fileInputRef}
      formattedDate={formattedDate}
      totalImages={totalImages}
      hasChanges={hasChanges}
      isPending={isPending}
      makesOptions={makesOptions}
      modelsOptions={modelsOptions}
      typesOptions={typesOptions}
      handleImageChange={handleImageChange}
      removeImage={removeImage}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
    />
  );
};

export default EditVehiclePage;
