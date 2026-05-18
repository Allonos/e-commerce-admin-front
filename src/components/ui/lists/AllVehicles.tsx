import { useMemo } from "react";
import { Table } from "antd";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../../store/useAuthStore";
import type { VehicleResponse } from "../../../utils/types/vehicleTypes";
import { useVehiclesTableState } from "./useVehiclesTableState";
import type { VehicleSortParams } from "./useVehiclesTableState";
import { buildVehiclesColumns } from "./vehiclesColumns";

interface IProps {
  vehicles: VehicleResponse | undefined;
  isFetching: boolean;
  setVehicleToDelete: (id: string | null) => void;
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  onSortChange: (sort: VehicleSortParams) => void;
}

const AllVehicles = (
  {
    vehicles,
    isFetching,
    setVehicleToDelete,
    page,
    setPage,
    pageSize,
    setPageSize,
    onSortChange,
  }: IProps,
) => {
  const { authUser } = useAuthStore();
  const navigate = useNavigate();

  const { filters, handleTableChange } = useVehiclesTableState(setPage, onSortChange);
  // useVehiclesTableState(page, setPage, lotValues);

  const columns = useMemo(
    () =>
      buildVehiclesColumns({
        filters,
        authUserId: authUser?.id,
        onEdit: (id) => navigate(`/vehicles/edit/${id}`),
        onDelete: setVehicleToDelete,
      }),
    [
      filters,
      authUser?.id,
      navigate,
      setVehicleToDelete,
    ],
  );

  return (
    <div className="px-4 pb-10">
      <Table
        dataSource={vehicles?.vehicles}
        columns={columns}
        rowKey="id"
        loading={isFetching}
        scroll={{ x: "max-content", y: 700 }}
        onChange={handleTableChange}
        pagination={{
          current: page,
          total: vehicles?.totalItems ?? 0,
          pageSize,
          showSizeChanger: true,
          pageSizeOptions: [10, 50, 100, 1000, 5000],
          onShowSizeChange: (_current, size) => setPageSize(size),
          showTotal: (total) => `${total} vehicle${total === 1 ? "" : "s"}`,
        }}
        style={{ textTransform: "capitalize" }}
        size="middle"
      />
    </div>
  );
};

export default AllVehicles;
