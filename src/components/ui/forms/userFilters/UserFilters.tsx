import { Form, Input, Select } from "antd";
import type { UsersQueryParams } from "../../../../services/apiServices/getAllUsers";

interface IProps {
  onSearch: (filters: UsersQueryParams) => void;
  onReset: () => void;
}

const UserFilters = ({ onSearch, onReset }: IProps) => {
  const [form] = Form.useForm<UsersQueryParams>();

  const handleSearch = () => {
    const values = form.getFieldsValue();
    const cleaned = Object.fromEntries(
      Object.entries(values).filter(
        ([, value]) => value !== undefined && value !== "" && value !== null,
      ),
    ) as UsersQueryParams;

    onSearch(cleaned);
  };

  const handleReset = () => {
    form.resetFields();
    onReset();
  };

  return (
    <div className="px-4 py-6 bg-gray-100 rounded-lg mx-4">
      <Form form={form} layout="vertical" className="filters-form">
        <Form.Item label="Username" name="username">
          <Input placeholder="Enter username" className="w-full" />
        </Form.Item>
        <Form.Item label="Role" name="role">
          <Select placeholder="Select role" allowClear className="w-full">
            <Select.Option value="USER">User</Select.Option>
            <Select.Option value="DEALER">Dealer</Select.Option>
            <Select.Option value="ADMIN">Admin</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Banned" name="isBanned">
          <Select placeholder="Select status" allowClear className="w-full">
            <Select.Option value="true">Banned</Select.Option>
            <Select.Option value="false">Not Banned</Select.Option>
          </Select>
        </Form.Item>
      </Form>

      <button
        className="bg-slate-700 text-white px-4 py-2 rounded-lg cursor-pointer text-[14px] hover:bg-slate-800 transition-colors duration-200 mt-4"
        onClick={handleSearch}
      >
        Search
      </button>
      <button
        className="ml-2 bg-white text-slate-700 border border-slate-300 px-4 py-2 rounded-lg cursor-pointer text-[14px] hover:bg-slate-100 transition-colors duration-200 mt-4"
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
};

export default UserFilters;
