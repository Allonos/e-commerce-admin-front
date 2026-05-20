import { Alert, Form, Input, Select, Switch } from "antd";
import { X } from "lucide-react";
import { useEditUserModal } from "./useEditUserModal";
import type { User } from "../../../utils/types/userTypes";

interface IProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  isMainAdmin: boolean;
}

const EditUserModal = ({ user, isOpen, onClose, isMainAdmin }: IProps) => {
  const { form, isBannedWatch, roleWatch, isPending, handleClose, handleSave } =
    useEditUserModal(user, isOpen, onClose);

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-200 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold">
            Edit User — <span className="text-slate-500">{user?.username}</span>
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-black transition-colors duration-200 cursor-pointer"
          >
            <X width={20} height={20} />
          </button>
        </div>

        {!isMainAdmin
          ? (
            <Alert
              type="error"
              showIcon
              title="Access Denied"
              description="You are not authorized to manage users. Only the main admin can perform this action."
              className="mb-4"
            />
          )
          : (
            <Form form={form} layout="vertical">
              <Form.Item label="Role" name="role">
                <Select>
                  <Select.Option value="USER">User</Select.Option>
                  <Select.Option value="DEALER">Dealer</Select.Option>
                  <Select.Option value="ADMIN">Admin</Select.Option>
                </Select>
              </Form.Item>

              {roleWatch === "ADMIN" && (
                <Form.Item label="Admin Role" name="adminRole">
                  <Select allowClear placeholder="No admin role">
                    <Select.Option value="MAIN">Main</Select.Option>
                    <Select.Option value="CONTENT">Content</Select.Option>
                  </Select>
                </Form.Item>
              )}

              <Form.Item label="Banned" name="isBanned" valuePropName="checked">
                <Switch />
              </Form.Item>

              {isBannedWatch && (
                <Form.Item
                  label="Ban Reason"
                  name="bannedReason"
                  rules={[{
                    required: true,
                    message: "Please provide a ban reason",
                  }]}
                >
                  <Input.TextArea
                    rows={3}
                    placeholder="Why is this user being banned?"
                  />
                </Form.Item>
              )}

              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 border border-gray-300 rounded-lg py-2 text-sm font-medium hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isPending}
                  className={`flex-1 bg-slate-700 text-white rounded-lg py-2 text-sm font-semibold hover:bg-slate-800 transition-colors duration-200 cursor-pointer ${
                    isPending ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isPending ? "Saving..." : "Save"}
                </button>
              </div>
            </Form>
          )}
      </div>
    </div>
  );
};

export default EditUserModal;
