import { Tag, Button, Space } from "antd";
import type { TableColumnsType } from "antd";
import { Pencil, Trash } from "lucide-react";

export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  isBanned: boolean;
  bannedAt: string | null;
  bannedReason: string | null;
  adminRole: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UsersResponse {
  users: User[];
  totalItems: number;
}

interface BuildColumnsParams {
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

const capitalize = (val: string) =>
  val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();

export function buildUsersColumns({ onEdit, onDelete }: BuildColumnsParams): TableColumnsType<User> {
  return [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      fixed: "left",
      width: 140,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 220,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 100,
      render: (role: string) => (
        <Tag
          color={role === "ADMIN"
            ? "blue"
            : role === "DEALER"
            ? "purple"
            : "default"}
        >
          {capitalize(role)}
        </Tag>
      ),
    },
    {
      title: "Admin Role",
      dataIndex: "adminRole",
      key: "adminRole",
      width: 130,
      render: (val: string | null) => val ? capitalize(val) : "—",
    },
    {
      title: "Banned",
      dataIndex: "isBanned",
      key: "isBanned",
      width: 100,
      render: (val: boolean) => (
        <Tag color={val ? "red" : "green"}>{val ? "Banned" : "Active"}</Tag>
      ),
    },
    {
      title: "Banned At",
      dataIndex: "bannedAt",
      key: "bannedAt",
      width: 120,
      render: (val: string | null) =>
        val ? new Date(val).toLocaleDateString() : "—",
    },
    {
      title: "Ban Reason",
      dataIndex: "bannedReason",
      key: "bannedReason",
      width: 180,
      render: (val: string | null) => val ?? "—",
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
      width: 100,
      render: (_, user) => (
        <Space>
          <Button size="small" icon={<Pencil size={12} />} onClick={() => onEdit(user)} />
          <Button size="small" danger icon={<Trash size={12} />} onClick={() => onDelete(user.id)} />
        </Space>
      ),
    },
  ];
}
