import { useNavigate } from "react-router";
import { useAddCarForm } from "../components/ui/modals/useAddCarForm";
import { useGetMakesServiceQuery } from "../services/react-query/vehicleCategories/query/useGetMakesServiceQuery";
import { useGetModelsServiceQuery } from "../services/react-query/vehicleCategories/query/useGetModelsServiceQuery";
import { useGetTypesServiceQuery } from "../services/react-query/vehicleCategories/query/useGetTypesServiceQuery";
import AddCarForm from "./AddCarForm";
import AddCarPageSkeleton from "../components/ui/skeletons/AddCarPageSkeleton";

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

const AddCarPage = () => {
  const navigate = useNavigate();

  const {
    state: { make, model, price, location, date, type, lot, images, previews },
    dispatch,
    fileInputRef,
    formattedDate,
    isPending,
    handleImageChange,
    removeImage,
    handleClose,
    handleSubmit,
  } = useAddCarForm(() => navigate("/"));

  const { data: makesData, isLoading: makesLoading } =
    useGetMakesServiceQuery();
  const { data: modelsData, isLoading: modelsLoading } =
    useGetModelsServiceQuery(make);
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

  if (makesLoading || modelsLoading || typesLoading) {
    return <AddCarPageSkeleton />;
  }

  return (
    <AddCarForm
      make={make}
      model={model}
      price={price}
      location={location}
      date={date}
      type={type}
      lot={lot}
      images={images}
      previews={previews}
      fileInputRef={fileInputRef}
      formattedDate={formattedDate}
      isPending={isPending}
      makesOptions={makesOptions}
      modelsOptions={modelsOptions}
      typesOptions={typesOptions}
      dispatch={dispatch}
      handleImageChange={handleImageChange}
      removeImage={removeImage}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
    />
  );
};

export default AddCarPage;
