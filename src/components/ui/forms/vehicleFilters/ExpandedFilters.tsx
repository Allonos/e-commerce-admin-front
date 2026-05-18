import { Form, Input } from "antd";
const ExpandedFilters = () => {
  return (
    <>
      <Form.Item label="Body Type">
        <Input placeholder="Enter body type" />
      </Form.Item>
      <Form.Item label="Country">
        <Input placeholder="Enter country" />
      </Form.Item>
      <Form.Item label="City">
        <Input placeholder="Enter city" />
      </Form.Item>
      <Form.Item label="Condition">
        <Input placeholder="Enter condition" />
      </Form.Item>
      <Form.Item label="Fuel Type">
        <Input placeholder="Enter fuel type" />
      </Form.Item>
      <div className="flex items-center gap-4">
        <Form.Item label="Min Price">
          <Input placeholder="Enter min price" type="number" />
        </Form.Item>
        <Form.Item label="Max Price">
          <Input placeholder="Enter max price" type="number" />
        </Form.Item>
      </div>
      <div className="flex items-center gap-4">
        <Form.Item label="Min Mileage">
          <Input placeholder="Enter min mileage" type="number" />
        </Form.Item>
        <Form.Item label="Max Mileage">
          <Input placeholder="Enter max mileage" type="number" />
        </Form.Item>
      </div>
      <div className="flex items-center gap-4">
        <Form.Item label="Min Engine">
          <Input placeholder="Enter min engine" type="number" />
        </Form.Item>
        <Form.Item label="Max Engine">
          <Input placeholder="Enter max engine" type="number" />
        </Form.Item>
      </div>
      <div className="flex items-center gap-4">
        <Form.Item label="Min Year">
          <Input placeholder="Enter min year" type="number" />
        </Form.Item>
        <Form.Item label="Max Year">
          <Input placeholder="Enter max year" type="number" />
        </Form.Item>
      </div>
    </>
  );
};

export default ExpandedFilters;
