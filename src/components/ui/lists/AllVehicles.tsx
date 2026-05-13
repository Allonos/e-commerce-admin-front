import { useMemo } from "react";
import { Table } from "antd";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../../store/useAuthStore";
import type { VehicleResponse } from "../../../utils/types/vehicleTypes";
import { useVehiclesTableState } from "./useVehiclesTableState";
import { buildVehiclesColumns } from "./vehiclesColumns";

interface IProps {
  vehicles: VehicleResponse | undefined;
  setVehicleToDelete: (id: string | null) => void;
  page: number;
  setPage: (page: number) => void;
}

const AllVehicles = (
  { vehicles, setVehicleToDelete, page, setPage }: IProps,
) => {
  const { authUser } = useAuthStore();
  const navigate = useNavigate();

  const lotValues = vehicles?.vehicles.map((v) => v.lot) ?? [];

  const { makes, models, types, lotOptions, filters, handleTableChange } =
    useVehiclesTableState(setPage, lotValues);
  // useVehiclesTableState(page, setPage, lotValues);

  const columns = useMemo(
    () =>
      buildVehiclesColumns({
        lotOptions,
        makes,
        models,
        types,
        filters,
        authUserId: authUser?.id,
        onEdit: (id) => navigate(`/vehicles/edit/${id}`),
        onDelete: setVehicleToDelete,
      }),
    [
      lotOptions,
      makes,
      models,
      types,
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
        scroll={{ x: "max-content" }}
        onChange={handleTableChange}
        pagination={{
          current: page,
          total: (vehicles?.totalPages ?? 1) * 10,
          pageSize: 10,
          showSizeChanger: false,
          showTotal: () =>
            `${vehicles?.vehicles.length ?? 0} vehicle${
              vehicles?.vehicles.length === 1 ? "" : "s"
            }`,
        }}
        style={{ textTransform: "capitalize" }}
        size="middle"
      />
    </div>
  );
};

export default AllVehicles;
