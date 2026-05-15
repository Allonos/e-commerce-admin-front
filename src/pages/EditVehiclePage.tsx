import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useEditVehicleForm } from "../components/ui/modals/useEditVehicleForm";
import { useGetVehicleByIdServiceQuery } from "../services/react-query/homePage/query/useGetVehicleByIdServiceQuery";
import { useGetMakesServiceQuery } from "../services/react-query/vehicleCategories/query/useGetMakesServiceQuery";
import { useGetModelsServiceQuery } from "../services/react-query/vehicleCategories/query/useGetModelsServiceQuery";
import { useGetTypesServiceQuery } from "../services/react-query/vehicleCategories/query/useGetTypesServiceQuery";
import { useGetAllCountriesServiceQuery } from "../services/react-query/locationsPage/query/useGetAllCountriesServiceQuery";
import { useGetCitiesServiceQuery } from "../services/react-query/locationsPage/query/useGetCitiesServiceQuery";
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
interface Country {
  id: string;
  name: string;
}
interface City {
  id: string;
  name: string;
}

const EditVehiclePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [countryId, setCountryId] = useState("");

  const { data: vehicleData, isLoading: vehiclesLoading } =
    useGetVehicleByIdServiceQuery(
      id,
    );
  const vehicle = vehicleData?.vehicle ?? null;

  useEffect(() => {
    if (vehicle?.city?.country?.id) {
      setCountryId(vehicle.city.country.id);
    }
  }, [vehicle]);

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
  const { data: modelsData } = useGetModelsServiceQuery(form.makes);
  const { data: typesData, isLoading: typesLoading } =
    useGetTypesServiceQuery();
  const { data: countriesData } = useGetAllCountriesServiceQuery();
  const { data: citiesData } = useGetCitiesServiceQuery(countryId);

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

  const countriesArray: Country[] = Array.isArray(countriesData)
    ? countriesData
    : (countriesData as { countries: Country[] })?.countries ?? [];
  const citiesArray: City[] = Array.isArray(citiesData)
    ? citiesData
    : (citiesData as { cities: City[] })?.cities ?? [];

  const countriesOptions = countriesArray.map((c) => ({
    label: c.name,
    value: c.id,
  }));
  const citiesOptions = citiesArray.map((c) => ({
    label: c.name,
    value: c.id,
  }));

  if (vehiclesLoading || makesLoading || typesLoading) {
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
      countriesOptions={countriesOptions}
      citiesOptions={citiesOptions}
      countryId={countryId}
      onCountryChange={setCountryId}
      handleImageChange={handleImageChange}
      removeImage={removeImage}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
    />
  );
};

export default EditVehiclePage;
