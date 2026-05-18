import { Button, Space, Tag } from "antd";
import type { TableColumnsType } from "antd";
import { Pencil, Trash } from "lucide-react";
import { Link } from "react-router";
import type { Vehicle } from "../../../utils/types/vehicleTypes";
import type { VehicleFilterState } from "./useVehiclesTableState";

interface BuildColumnsParams {
  filters: VehicleFilterState;
  authUserId: string | undefined;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function buildVehiclesColumns({
  authUserId,
  onEdit,
  onDelete,
}: BuildColumnsParams): TableColumnsType<Vehicle> {
  return [
    {
      title: "Lot number",
      dataIndex: "lot",
      key: "lot",
      fixed: "left",
      width: 120,
      sorter: true,
      render: (val: number) => `LOT-${val}`,
    },
    {
      title: "Image",
      key: "image",
      width: 100,
      render: (_, v) => (
        <Link to={`/product/${v.id}`}>
          <div className="relative w-20 h-14 rounded-lg overflow-hidden bg-gray-100">
            <img
              src={v.images[0]}
              alt={v.model.name}
              className="object-cover w-full h-full"
            />
            {v.images.length > 1 && (
              <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1 rounded">
                +{v.images.length - 1}
              </span>
            )}
          </div>
        </Link>
      ),
    },
    {
      title: "Make",
      key: "make",
      width: 130,
      render: (_, v) => <span className="capitalize">{v.make.name}</span>,
    },
    {
      title: "Model",
      key: "model",
      width: 130,
      render: (_, v) => <span className="capitalize">{v.model.name}</span>,
    },
    {
      title: "Type",
      key: "type",
      width: 120,
      render: (_, v) => <span className="capitalize">{v.type.name}</span>,
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      width: 80,
      sorter: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 110,
      sorter: true,
      render: (price: number) => `$${price.toLocaleString()}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 110,
      render: (status: string) => (
        <Tag
          color={(status === "active" && "blue") ||
            (status === "inactive" && "orange") ||
            (status === "sold" && "red") || "default"}
          className="capitalize"
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Country",
      key: "country",
      width: 130,
      render: (_: unknown, v: { city?: { country?: { name: string } } }) =>
        v.city?.country?.name ?? "—",
    },
    {
      title: "City",
      key: "city",
      width: 130,
      render: (_: unknown, v: { city?: { name: string } }) =>
        v.city?.name ?? "—",
    },
    {
      title: "Owner",
      key: "owner",
      width: 120,
      render: (_, v) => v.owner.username,
    },
    {
      title: "Mileage",
      dataIndex: "mileage",
      key: "mileage",
      width: 110,
      sorter: true,
      render: (val: number) => `${val.toLocaleString()} km`,
    },
    {
      title: "Engine",
      dataIndex: "engine",
      key: "engine",
      width: 100,
      sorter: true,
      render: (val: number) => `${val} cc`,
    },
    {
      title: "Transmission",
      dataIndex: "transmission",
      key: "transmission",
      width: 130,
      render: (val: string) => val.replace(/_/g, " ").toLowerCase(),
    },
    {
      title: "Condition",
      dataIndex: "condition",
      key: "condition",
      width: 110,
      render: (val: string) => val.toLowerCase(),
    },
    {
      title: "Fuel Type",
      dataIndex: "fuelType",
      key: "fuelType",
      width: 130,
      render: (val: string) => val.replace(/_/g, " ").toLowerCase(),
    },
    {
      title: "Views",
      dataIndex: "views",
      key: "views",
      width: 90,
      sorter: true,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      width: 90,
      sorter: true,
    },
    {
      title: "Featured",
      dataIndex: "isFeatured",
      key: "isFeatured",
      width: 110,
      render: (val: boolean) => (
        <Tag color={val ? "yellow" : "default"}>{val ? "true" : "false"}</Tag>
      ),
      sorter: true,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 120,
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 150,
      render: (_, v) =>
        authUserId === v.owner.id
          ? (
            <Space>
              <Button
                size="small"
                icon={<Pencil size={12} />}
                onClick={() => onEdit(v.id)}
              >
              </Button>
              <Button
                size="small"
                danger
                icon={<Trash size={12} />}
                onClick={() => onDelete(v.id)}
              >
              </Button>
            </Space>
          )
          : <span className="text-gray-300">—</span>,
    },
  ];
}
