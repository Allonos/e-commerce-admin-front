import { useState } from "react";
import { useNavigate } from "react-router";
import { useAddVehicleForm } from "../components/ui/modals/useAddVehicleForm";
import { useGetMakesServiceQuery } from "../services/react-query/vehicleCategories/query/useGetMakesServiceQuery";
import { useGetModelsServiceQuery } from "../services/react-query/vehicleCategories/query/useGetModelsServiceQuery";
import { useGetTypesServiceQuery } from "../services/react-query/vehicleCategories/query/useGetTypesServiceQuery";
import { useGetAllCountriesServiceQuery } from "../services/react-query/locationsPage/query/useGetAllCountriesServiceQuery";
import { useGetCitiesServiceQuery } from "../services/react-query/locationsPage/query/useGetCitiesServiceQuery";
import AddVehicleForm from "../components/ui/forms/AddVehicleForm";
import AddVehiclePageSkeleton from "../components/ui/skeletons/AddVehiclePageSkeleton";

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

const AddVehiclePage = () => {
  const navigate = useNavigate();
  const [countryId, setCountryId] = useState("");

  const {
    state: {
      make,
      model,
      price,
      date,
      type,
      isFeatured,
      status,
      priority,
      mileage,
      engine,
      transmission,
      condition,
      fuelType,
      cityId,
      images,
      previews,
    },
    dispatch,
    fileInputRef,
    formattedDate,
    isPending,
    handleImageChange,
    removeImage,
    handleClose,
    handleSubmit,
  } = useAddVehicleForm(() => navigate("/"));

  const { data: makesData, isLoading: makesLoading } =
    useGetMakesServiceQuery();
  const { data: modelsData } = useGetModelsServiceQuery(make);
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

  if (makesLoading || typesLoading) {
    return <AddVehiclePageSkeleton />;
  }

  return (
    <AddVehicleForm
      make={make}
      model={model}
      price={price}
      date={date}
      type={type}
      isFeatured={isFeatured}
      status={status}
      priority={priority}
      mileage={mileage}
      engine={engine}
      transmission={transmission}
      condition={condition}
      fuelType={fuelType}
      cityId={cityId}
      countryId={countryId}
      images={images}
      previews={previews}
      fileInputRef={fileInputRef}
      formattedDate={formattedDate}
      isPending={isPending}
      makesOptions={makesOptions}
      modelsOptions={modelsOptions}
      typesOptions={typesOptions}
      countriesOptions={countriesOptions}
      citiesOptions={citiesOptions}
      dispatch={dispatch}
      onCountryChange={setCountryId}
      handleImageChange={handleImageChange}
      removeImage={removeImage}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
    />
  );
};

export default AddVehiclePage;
