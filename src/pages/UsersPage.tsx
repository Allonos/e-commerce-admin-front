import { useState } from "react";
import { useGetAllUsersServiceQuery } from "../services/react-query/usersPage/query/useGetAllUsersServiceQuery";
import type { UsersQueryParams } from "../services/apiServices/getAllUsers";
import { useAuthStore } from "../store/useAuthStore";
import { useDeleteUserServiceMutation } from "../services/react-query/usersPage/mutation/useDeleteUserServiceMutation";
import { Alert } from "antd";
import { X } from "lucide-react";
import UsersPageHeader from "../components/ui/headers/usersPage/UsersPageHeader";
import UserFilters from "../components/ui/forms/userFilters/UserFilters";
import AllUsers from "../components/ui/lists/AllUsers";
import EditUserModal from "../components/ui/modals/EditUserModal";
import DeleteModal from "../components/ui/modals/DeleteModal";
import type { User } from "../utils/types/userTypes";

const UsersPage = () => {
  const { authUser } = useAuthStore();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filterParams, setFilterParams] = useState<UsersQueryParams>({});
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [unauthorizedOpen, setUnauthorizedOpen] = useState(false);
  const { mutate: deleteUser, isPending: isDeleting } =
    useDeleteUserServiceMutation();

  const { data: users, isFetching } = useGetAllUsersServiceQuery(
    page,
    pageSize,
    filterParams,
  );

  const isMainAdmin = authUser?.adminRole === "MAIN";

  const handleSearch = (filters: UsersQueryParams) => {
    setPage(1);
    setFilterParams(filters);
  };

  const handleReset = () => {
    setPage(1);
    setFilterParams({});
  };

  const handleDelete = (id: string) => {
    if (isMainAdmin) {
      setUserToDelete(id);
    } else {
      setUnauthorizedOpen(true);
    }
  };

  const handleConfirmDelete = (id: string) => {
    deleteUser(id, { onSettled: () => setUserToDelete(null) });
  };

  return (
    <>
      <UsersPageHeader />
      <UserFilters onSearch={handleSearch} onReset={handleReset} />
      <AllUsers
        users={users}
        isFetching={isFetching}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={(size) => {
          setPageSize(size);
          setPage(1);
        }}
        onEdit={(user) => setUserToEdit(user)}
        onDelete={handleDelete}
      />
      <EditUserModal
        user={userToEdit}
        isOpen={!!userToEdit}
        onClose={() => setUserToEdit(null)}
        isMainAdmin={isMainAdmin}
      />
      <DeleteModal
        title="this user"
        id={userToDelete ?? ""}
        isOpen={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        onConfirm={handleConfirmDelete}
        isPending={isDeleting}
      />

      <div
        className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-200 ${
          unauthorizedOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setUnauthorizedOpen(false)}
      >
        <div
          className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Delete User</h2>
            <button
              onClick={() => setUnauthorizedOpen(false)}
              className="text-gray-500 hover:text-black transition-colors duration-200 cursor-pointer"
            >
              <X width={20} height={20} />
            </button>
          </div>
          <Alert
            type="error"
            showIcon
            title="Access Denied"
            description="You are not authorized to delete users. Only the main admin can perform this action."
          />
        </div>
      </div>
    </>
  );
};

export default UsersPage;
