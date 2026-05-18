import { Form, Input, Select } from "antd";
const ExpandedFilters = () => {
  return (
    <>
      <Form.Item label="Body Type" name="type">
        <Input placeholder="Enter body type" />
      </Form.Item>
      <Form.Item label="Country" name="country">
        <Input placeholder="Enter country" />
      </Form.Item>
      <Form.Item label="City" name="city">
        <Input placeholder="Enter city" />
      </Form.Item>
      <Form.Item label="Condition" name="condition">
        <Select
          placeholder="Select condition"
          allowClear
          options={[
            { label: "Used", value: "USED" },
            { label: "New", value: "NEW" },
          ]}
        />
      </Form.Item>
      <Form.Item label="Transmission" name="transmission">
        <Select
          placeholder="Select transmission"
          allowClear
          options={[
            { label: "Automatic", value: "AUTOMATIC" },
            { label: "Manual", value: "MANUAL" },
            { label: "Semi-Automatic", value: "SEMI_AUTOMATIC" },
            { label: "CVT", value: "CVT" },
          ]}
        />
      </Form.Item>
      <Form.Item label="Fuel Type" name="fuelType">
        <Select
          placeholder="Select fuel type"
          allowClear
          options={[
            { label: "Gasoline", value: "GASOLINE" },
            { label: "Diesel", value: "DIESEL" },
            { label: "Electric", value: "ELECTRIC" },
            { label: "Hybrid", value: "HYBRID" },
            { label: "Plug-in Hybrid", value: "PLUG_IN_HYBRID" },
            { label: "LPG", value: "LPG" },
            { label: "CNG", value: "CNG" },
            { label: "Hydrogen", value: "HYDROGEN" },
          ]}
        />
      </Form.Item>
      <Form.Item label="Vehicle Status" name="status">
        <Select
          placeholder="Select status"
          allowClear
          options={[
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
            { label: "Sold", value: "sold" },
          ]}
        />
      </Form.Item>
      <Form.Item label="Featured" name="featured">
        <Select
          placeholder="Select featured"
          allowClear
          options={[
            { label: "Yes", value: true },
            { label: "No", value: false },
          ]}
        />
      </Form.Item>
      <div className="flex items-center gap-4">
        <Form.Item label="Min Price" name="minPrice">
          <Input placeholder="Enter min price" type="number" />
        </Form.Item>
        <Form.Item label="Max Price" name="maxPrice">
          <Input placeholder="Enter max price" type="number" />
        </Form.Item>
      </div>
      <div className="flex items-center gap-4">
        <Form.Item label="Min Mileage" name="minMileage">
          <Input placeholder="Enter min mileage" type="number" />
        </Form.Item>
        <Form.Item label="Max Mileage" name="maxMileage">
          <Input placeholder="Enter max mileage" type="number" />
        </Form.Item>
      </div>
      <div className="flex items-center gap-4">
        <Form.Item label="Min Engine" name="minEngine">
          <Input placeholder="Enter min engine" type="number" />
        </Form.Item>
        <Form.Item label="Max Engine" name="maxEngine">
          <Input placeholder="Enter max engine" type="number" />
        </Form.Item>
      </div>
      <div className="flex items-center gap-4">
        <Form.Item label="Min Year" name="minYear">
          <Input placeholder="Enter min year" type="number" />
        </Form.Item>
        <Form.Item label="Max Year" name="maxYear">
          <Input placeholder="Enter max year" type="number" />
        </Form.Item>
      </div>
    </>
  );
};

export default ExpandedFilters;
