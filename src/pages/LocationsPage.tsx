import { useState } from "react";
import { Globe, MapPin } from "lucide-react";
import VehicleCategoryCards from "../components/ui/cards/categoriesCards/VehicleCategoryCards";
import { useGetAllCountriesServiceQuery } from "../services/react-query/locationsPage/query/useGetAllCountriesServiceQuery";
import { useGetCitiesServiceQuery } from "../services/react-query/locationsPage/query/useGetCitiesServiceQuery";
import { useAddCountryServiceMutation } from "../services/react-query/locationsPage/mutation/useAddCountryServiceMutation";
import { useAddCityServiceMutation } from "../services/react-query/locationsPage/mutation/useAddCityServiceMutation";
import { useDeleteCountryServiceMutation } from "../services/react-query/locationsPage/mutation/useDeleteCountryServiceMutation";
import { useDeleteCityServiceMutation } from "../services/react-query/locationsPage/mutation/useDeleteCityServiceMutation";

interface Country {
  id: string;
  name: string;
}

interface City {
  id: string;
  name: string;
  countryId: string;
}

const LocationsPage = () => {
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");

  const { data: countriesData } = useGetAllCountriesServiceQuery();

  const countriesArray: Country[] = Array.isArray(countriesData)
    ? countriesData
    : (countriesData as { countries: Country[] })?.countries ?? [];

  const countriesOptions = countriesArray.map((country) => ({
    label: country.name,
    value: country.id,
    id: country.id,
  }));

  const effectiveSelectedCountryId = selectedCountryId ||
    countriesOptions[0]?.value || "";

  const { data: citiesData } = useGetCitiesServiceQuery(
    effectiveSelectedCountryId,
  );

  const { mutate: addCountry, isPending: isAddingCountry } =
    useAddCountryServiceMutation();
  const { mutate: addCity, isPending: isAddingCity } =
    useAddCityServiceMutation();
  const { mutate: deleteCountry } = useDeleteCountryServiceMutation();
  const { mutate: deleteCity } = useDeleteCityServiceMutation();

  const citiesArray: City[] = Array.isArray(citiesData)
    ? citiesData
    : (citiesData as { cities: City[] })?.cities ?? [];

  const citiesOptions = citiesArray.map((city) => ({
    label: city.name,
    value: city.id,
    id: city.id,
  }));

  const effectiveSelectedCityId =
    citiesOptions.find((c) => c.value === selectedCityId)?.value ||
    citiesOptions[0]?.value ||
    "";

  const handleCountryChange = (value: string) => {
    setSelectedCountryId(value);
    setSelectedCityId("");
  };

  const handleCityChange = (value: string) => {
    setSelectedCityId(value);
  };

  return (
    <section>
      <header className="h-19.25 w-full py-4 pb-5 px-4 border-b border-[#c7c7c765]">
        <h2 className="text-[24px] text-[#0F172B] font-bold">Locations</h2>
        <p className="text-[16px] text-[#62748E]">
          Manage your countries and cities.
        </p>
      </header>
      <div className="pt-10 px-8 grid grid-cols-1 lg:grid-cols-2 w-full items-center justify-between gap-6">
        <VehicleCategoryCards
          cardIcon={<Globe className="w-5 h-5 text-slate-900" />}
          cardTitle="Countries"
          selected={effectiveSelectedCountryId}
          onChange={handleCountryChange}
          options={countriesOptions}
          placeholder="e.g. Georgia"
          emptyMessage="There are no countries added yet"
          onAdd={(value) => addCountry(value)}
          onDelete={(id) => {
            deleteCountry(id);
            if (id === effectiveSelectedCountryId) {
              setSelectedCountryId("");
              setSelectedCityId("");
            }
          }}
          isPending={isAddingCountry}
        />
        <VehicleCategoryCards
          cardIcon={<MapPin className="w-5 h-5 text-slate-900" />}
          cardTitle="Cities"
          selected={effectiveSelectedCityId}
          onChange={handleCityChange}
          options={citiesOptions}
          placeholder="e.g. Tbilisi"
          emptyMessage={effectiveSelectedCountryId
            ? "There are no cities added for this country yet"
            : "Select a country first"}
          onAdd={(value) =>
            addCity({ name: value, countryId: effectiveSelectedCountryId })}
          onDelete={(id) => {
            deleteCity(id);
            if (id === effectiveSelectedCityId) setSelectedCityId("");
          }}
          isPending={isAddingCity}
        />
      </div>
    </section>
  );
};

export default LocationsPage;
