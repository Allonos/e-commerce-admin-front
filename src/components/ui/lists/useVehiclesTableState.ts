import { useState } from "react";
import type { TableProps } from "antd";
import type { Vehicle } from "../../../utils/types/vehicleTypes";
import type { VehicleQueryParams } from "../../../services/apiServices/getAdminsVehicles";

export interface VehicleFilterState {
  status: string[];
}

export type VehicleSortParams = Pick<
  VehicleQueryParams,
  "sortBy" | "sortOrder"
>;

export const useVehiclesTableState = (
  setPage: (page: number) => void,
  onSortChange: (sort: VehicleSortParams) => void,
) => {
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
      const { columnKey, order } = sorter;
      if (!order) {
        onSortChange({});
      } else {
        onSortChange({
          sortBy: columnKey as string,
          sortOrder: order === "ascend" ? "asc" : "desc",
        });
      }
    }
  };

  return {
    filters,
    handleTableChange,
  };
};
