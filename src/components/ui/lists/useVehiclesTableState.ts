import { useState } from "react";
import type { TableProps } from "antd";
import type { Vehicle } from "../../../utils/types/vehicleTypes";
import { useGetMakesServiceQuery } from "../../../services/react-query/vehicleCategories/query/useGetMakesServiceQuery";
import { useGetModelsServiceQuery } from "../../../services/react-query/vehicleCategories/query/useGetModelsServiceQuery";
import { useGetTypesServiceQuery } from "../../../services/react-query/vehicleCategories/query/useGetTypesServiceQuery";

export type Category = { id: string; name: string; makeId?: string };

export interface VehicleFilterState {
  lot: string[];
  make: string[];
  model: string[];
  type: string[];
  status: string[];
  featured: string[];
}

export function toArray(data: unknown): Category[] {
  if (!data) return [];
  if (Array.isArray(data)) return data as Category[];
  const wrapped = data as Record<string, Category[]>;
  return wrapped[Object.keys(wrapped)[0]] ?? [];
}

export const useVehiclesTableState = (
  currentPage: number,
  setPage: (page: number) => void,
  lotValues: string[],
) => {
  const [filters, setFilters] = useState<VehicleFilterState>({
    lot: [],
    make: [],
    model: [],
    type: [],
    status: [],
    featured: [],
  });

  const { data: makesData } = useGetMakesServiceQuery();
  const { data: modelsData } = useGetModelsServiceQuery();
  const { data: typesData } = useGetTypesServiceQuery();

  const makes = toArray(makesData);
  const models = toArray(modelsData);
  const types = toArray(typesData);

  const lotOptions = Array.from(new Set(lotValues)).map((lot) => ({
    text: lot,
    value: lot,
  }));

  const handleTableChange: TableProps<Vehicle>["onChange"] = (
    pagination,
    rawFilters,
    sorter,
  ) => {
    if (pagination.current) setPage(pagination.current);

    setFilters({
      lot: (rawFilters.lot as string[]) ?? [],
      make: (rawFilters.make as string[]) ?? [],
      model: (rawFilters.model as string[]) ?? [],
      type: (rawFilters.type as string[]) ?? [],
      status: (rawFilters.status as string[]) ?? [],
      featured: (rawFilters.isFeatured as string[]) ?? [],
    });

    if (!Array.isArray(sorter)) {
      const _sortField = sorter.columnKey;
      const _sortOrder = sorter.order;
      void _sortField;
      void _sortOrder;
    }
  };

  return {
    makes,
    models,
    types,
    lotOptions,
    filters,
    handleTableChange,
  };
};
