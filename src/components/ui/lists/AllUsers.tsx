import { useMemo } from "react";
import { Table } from "antd";
import { buildUsersColumns, type User, type UsersResponse } from "./usersColumns";

interface IProps {
  users: UsersResponse | undefined;
  isFetching: boolean;
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

const AllUsers = ({
  users,
  isFetching,
  page,
  setPage,
  pageSize,
  setPageSize,
  onEdit,
  onDelete,
}: IProps) => {
  const columns = useMemo(
    () => buildUsersColumns({ onEdit, onDelete }),
    [onEdit, onDelete],
  );

  return (
    <div className="px-4 pb-10">
      <Table
        dataSource={users?.users}
        columns={columns}
        rowKey="id"
        loading={isFetching}
        scroll={{ x: "max-content", y: 700 }}
        onChange={(pagination) => {
          if (pagination.current) setPage(pagination.current);
        }}
        pagination={{
          current: page,
          total: users?.totalItems ?? 0,
          pageSize,
          showSizeChanger: true,
          pageSizeOptions: [10, 50, 100, 1000, 5000],
          onShowSizeChange: (_current, size) => setPageSize(size),
          showTotal: (total) => `${total} user${total === 1 ? "" : "s"}`,
        }}
        size="middle"
      />
    </div>
  );
};

export default AllUsers;
