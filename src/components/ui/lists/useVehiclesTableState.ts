import { useState } from "react";
import type { TableProps } from "antd";
import type { Vehicle } from "../../../utils/types/vehicleTypes";

export interface VehicleFilterState {
  status: string[];
}

export const useVehiclesTableState = (setPage: (page: number) => void) => {
  const [filters, setFilters] = useState<VehicleFilterState>({
    status: [],
  });

  const handleTableChange: TableProps<Vehicle>["onChange"] = (
    pagination,
    rawFilters,
    sorter,
  ) => {
    if (pagination.current) setPage(pagination.current);

    setFilters({
      status: (rawFilters.status as string[]) ?? [],
    });

    if (!Array.isArray(sorter)) {
      const _sortField = sorter.columnKey;
      const _sortOrder = sorter.order;
      void _sortField;
      void _sortOrder;
    }
  };

  return {
    filters,
    handleTableChange,
  };
};
