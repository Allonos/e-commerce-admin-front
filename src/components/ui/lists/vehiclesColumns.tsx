import { Button, Space, Tag } from "antd";
import type { TableColumnsType } from "antd";
import { Pencil, Trash } from "lucide-react";
import { Link } from "react-router";
import type { Vehicle } from "../../../utils/types/vehicleTypes";
import type { Category, VehicleFilterState } from "./useVehiclesTableState";

interface BuildColumnsParams {
  lotOptions: { text: string; value: string }[];
  makes: Category[];
  models: Category[];
  types: Category[];
  filters: VehicleFilterState;
  authUserId: string | undefined;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function buildVehiclesColumns({
  lotOptions,
  makes,
  models,
  types,
  filters,
  authUserId,
  onEdit,
  onDelete,
}: BuildColumnsParams): TableColumnsType<Vehicle> {
  return [
    {
      title: "Lot",
      dataIndex: "lot",
      key: "lot",
      fixed: "left",
      width: 110,
      filters: lotOptions,
      filterMode: "tree",
      filterSearch: true,
      filteredValue: filters.lot,
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
      filters: makes.map((m) => ({ text: m.name, value: m.id })),
      filterMode: "tree",
      filterSearch: true,
      filteredValue: filters.make,
    },
    {
      title: "Model",
      key: "model",
      width: 130,
      render: (_, v) => <span className="capitalize">{v.model.name}</span>,
      filters: makes
        .map((make) => ({
          text: make.name,
          value: make.id,
          children: models
            .filter((m) => m.makeId === make.id)
            .map((m) => ({ text: m.name, value: m.id })),
        }))
        .filter((m) => m.children.length > 0),
      filterMode: "tree",
      filterSearch: true,
      filteredValue: filters.model,
    },
    {
      title: "Type",
      key: "type",
      width: 120,
      render: (_, v) => <span className="capitalize">{v.type.name}</span>,
      filters: types.map((t) => ({ text: t.name, value: t.id })),
      filterMode: "tree",
      filterSearch: true,
      filteredValue: filters.type,
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      width: 80,
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
          color={status === "active" ? "blue" : "default"}
          className="capitalize"
        >
          {status}
        </Tag>
      ),
      filters: [
        { text: "Active", value: "active" },
        { text: "Inactive", value: "inactive" },
      ],
      filterMode: "tree",
      filteredValue: filters.status,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: 150,
    },
    {
      title: "Owner",
      key: "owner",
      width: 120,
      render: (_, v) => v.owner.username,
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
    },
    {
      title: "Featured",
      dataIndex: "isFeatured",
      key: "isFeatured",
      width: 110,
      render: (val: boolean) => (
        <Tag color={val ? "yellow" : "default"}>{val ? "true" : "false"}</Tag>
      ),
      filters: [
        { text: "Featured", value: "true" },
        { text: "Not Featured", value: "false" },
      ],
      filterMode: "tree",
      filteredValue: filters.featured,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 120,
      sorter: true,
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
                Edit
              </Button>
              <Button
                size="small"
                danger
                icon={<Trash size={12} />}
                onClick={() => onDelete(v.id)}
              >
                Delete
              </Button>
            </Space>
          )
          : <span className="text-gray-300">—</span>,
    },
  ];
}
