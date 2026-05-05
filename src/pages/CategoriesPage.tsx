import { useState } from "react";
import VehicleCategoryCards from "../components/ui/cards/categoriesCards/VehicleCategoryCards";
import { CarFront, LayoutGrid, Tag } from "lucide-react";
import { useGetMakesServiceQuery } from "../services/react-query/vehicleCategories/query/useGetMakesServiceQuery";
import { useGetModelsServiceQuery } from "../services/react-query/vehicleCategories/query/useGetModelsServiceQuery";
import { useGetTypesServiceQuery } from "../services/react-query/vehicleCategories/query/useGetTypesServiceQuery";
import { useAddMakeServiceMutation } from "../services/react-query/vehicleCategories/mutation/useAddMakeServiceMutation";
import { useAddModelServiceMutation } from "../services/react-query/vehicleCategories/mutation/useAddModelServiceMutation";
import { useAddTypeServiceMutation } from "../services/react-query/vehicleCategories/mutation/useAddTypeServiceMutation";

interface Types {
  id: string;
  name: string;
}

interface Make {
  id: string;
  name: string;
}

interface Model {
  id: string;
  name: string;
  makeId: string;
}

const CategoriesPage = () => {
  const [selectedMakeId, setSelectedMakeId] = useState("");
  const [selectedModelId, setSelectedModelId] = useState("");
  const [selectedTypes, setSelectedTypes] = useState("");

  const { data: makesData } = useGetMakesServiceQuery();

  const makesArray: Make[] = Array.isArray(makesData)
    ? makesData
    : (makesData as { makes: Make[] })?.makes ?? [];

  const makesOptions = makesArray.map((make) => ({
    label: make.name,
    value: make.id,
    id: make.id,
  }));

  const effectiveSelectedMakeId = selectedMakeId || makesOptions[0]?.value ||
    "";

  const { data: modelsData } = useGetModelsServiceQuery(
    effectiveSelectedMakeId,
  );
  const { data: types } = useGetTypesServiceQuery();

  const { mutate: addMake, isPending: isAddingMake } =
    useAddMakeServiceMutation();
  const { mutate: addModel, isPending: isAddingModel } =
    useAddModelServiceMutation();
  const { mutate: addType, isPending: isAddingType } =
    useAddTypeServiceMutation();

  const modelsArray: Model[] = Array.isArray(modelsData)
    ? modelsData
    : (modelsData as { models: Model[] })?.models ?? [];

  const modelsOptions = modelsArray.map((model) => ({
    label: model.name,
    value: model.id,
    id: model.id,
  }));

  const effectiveSelectedModelId =
    modelsOptions.find((m) => m.value === selectedModelId)?.value ||
    modelsOptions[0]?.value ||
    "";

  const typesArray: Types[] = Array.isArray(types)
    ? types
    : (types as { types: Types[] })?.types ?? [];

  const typesOptions: { label: string; value: string; id: string }[] =
    typesArray.map((type) => ({
      label: type.name,
      value: type.id,
      id: type.id,
    }));

  const effectiveSelectedTypes = selectedTypes || typesOptions[0]?.value || "";

  const handleMakesChange = (value: string) => {
    setSelectedMakeId(value);
    setSelectedModelId("");
  };

  const handleTypesChange = (value: string) => {
    setSelectedTypes(value);
  };

  const handleModelsChange = (value: string) => {
    setSelectedModelId(value);
  };
  return (
    <section>
      <header className="h-19.25 w-full py-4 pb-5 px-4 border-b border-[#c7c7c765]">
        <h2 className="text-[24px] text-[#0F172B] font-bold">Categories</h2>
        <p className="text-[16px] text-[#62748E]">
          Manage your vehicle classifications, models, and body types.
        </p>
      </header>
      <div className="pt-10 px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full items-center justify-between gap-6">
        <VehicleCategoryCards
          cardIcon={<CarFront className="w-5 h-5 text-slate-900" />}
          cardTitle="Makes"
          selected={effectiveSelectedMakeId}
          onChange={handleMakesChange}
          options={makesOptions}
          placeholder="e.g. Chevrolet"
          emptyMessage="There are no makes added yet"
          onAdd={(value) => addMake(value)}
          isPending={isAddingMake}
        />
        <VehicleCategoryCards
          cardIcon={<Tag className="w-5 h-5 text-slate-900" />}
          cardTitle="Vehicle Models"
          selected={effectiveSelectedModelId}
          onChange={handleModelsChange}
          options={modelsOptions}
          placeholder="e.g. Silverado"
          emptyMessage={effectiveSelectedMakeId
            ? "There are no models added yet"
            : "Select a make first"}
          onAdd={(value) =>
            addModel({ model: value, makeId: effectiveSelectedMakeId })}
          isPending={isAddingModel}
        />
        <VehicleCategoryCards
          cardIcon={<LayoutGrid className="w-5 h-5 text-slate-900" />}
          cardTitle="Body Types"
          selected={effectiveSelectedTypes}
          onChange={handleTypesChange}
          options={typesOptions}
          placeholder="e.g. Coupe"
          emptyMessage="There are no body types added yet"
          onAdd={(value) => addType(value)}
          isPending={isAddingType}
        />
      </div>
    </section>
  );
};

export default CategoriesPage;
