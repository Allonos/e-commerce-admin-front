import { useEffect } from "react";
import { Form } from "antd";
import { useChangeUserRoleServiceMutation } from "../../../services/react-query/usersPage/mutation/useChangeUserRoleServiceMutation";
import { useChangeAdminRoleServiceMutation } from "../../../services/react-query/usersPage/mutation/useChangeAdminRoleServiceMutation";
import { useBanUserServiceMutation } from "../../../services/react-query/usersPage/mutation/useBanUserServiceMutation";
import { useCancelBanUserServiceMutation } from "../../../services/react-query/usersPage/mutation/useCancelBanUserServiceMutation";
import type { User } from "../../../utils/types/userTypes";

export interface EditUserFormValues {
  role: string;
  adminRole: string | null;
  isBanned: boolean;
  bannedReason: string;
}

export const useEditUserModal = (
  user: User | null,
  isOpen: boolean,
  onClose: () => void,
) => {
  const [form] = Form.useForm<EditUserFormValues>();
  const isBannedWatch = Form.useWatch("isBanned", form);
  const roleWatch = Form.useWatch("role", form);

  const { mutate: changeRole, isPending: isRolePending } =
    useChangeUserRoleServiceMutation();
  const { mutate: changeAdminRole, isPending: isAdminRolePending } =
    useChangeAdminRoleServiceMutation();
  const { mutate: banUser, isPending: isBanPending } =
    useBanUserServiceMutation();
  const { mutate: cancelBan, isPending: isCancelBanPending } =
    useCancelBanUserServiceMutation();

  const isPending =
    isRolePending || isAdminRolePending || isBanPending || isCancelBanPending;

  useEffect(() => {
    if (user && isOpen) {
      form.setFieldsValue({
        role: user.role,
        adminRole: user.adminRole ?? undefined,
        isBanned: user.isBanned,
        bannedReason: user.bannedReason ?? "",
      });
    }
  }, [user, isOpen, form]);

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  const handleSave = () => {
    if (!user) return;
    const values = form.getFieldsValue();
    const roleChanged = values.role !== user.role;
    const adminRoleChanged = values.adminRole !== user.adminRole;
    const banChanged = isBannedWatch !== user.isBanned;

    if (roleChanged) {
      changeRole({ userId: user.id, newRole: values.role });
    }

    if (values.role === "ADMIN" && adminRoleChanged && values.adminRole) {
      changeAdminRole({ userId: user.id, newAdminRole: values.adminRole });
    }

    if (banChanged && isBannedWatch) {
      form.validateFields(["bannedReason"]).then(() => {
        banUser(
          { userId: user.id, banReason: values.bannedReason },
          { onSuccess: handleClose },
        );
      });
    } else if (banChanged && !isBannedWatch) {
      cancelBan({ userId: user.id }, { onSuccess: handleClose });
    } else {
      handleClose();
    }
  };

  return { form, isBannedWatch, roleWatch, isPending, handleClose, handleSave };
};
