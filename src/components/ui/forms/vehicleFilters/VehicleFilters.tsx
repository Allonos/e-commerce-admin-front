import { Form, Input } from "antd";
import { FilterIcon } from "../../../../assets/SvgToTsx";
import { ArrowDownIcon } from "lucide-react";
import { useState } from "react";
import ExpandedFilters from "./ExpandedFilters";
import type { VehicleQueryParams } from "../../../../services/apiServices/getAdminsVehicles";

interface IProps {
  onSearch: (filters: VehicleQueryParams) => void;
  onReset: () => void;
}

const numericFields: (keyof VehicleQueryParams)[] = [
  "minPrice",
  "maxPrice",
  "minMileage",
  "maxMileage",
  "minEngine",
  "maxEngine",
  "minYear",
  "maxYear",
];

const VehicleFilters = ({ onSearch, onReset }: IProps) => {
  const [advancedFiltersVisible, setAdvancedFiltersVisible] = useState(false);
  const [form] = Form.useForm<VehicleQueryParams>();

  const handleSearch = () => {
    const values = form.getFieldsValue();
    const cleaned = Object.fromEntries(
      Object.entries(values).filter(([, value]) =>
        value !== undefined && value !== "" && value !== null
      ),
    ) as VehicleQueryParams;

    numericFields.forEach((field) => {
      if (cleaned[field] !== undefined) {
        (cleaned as Record<string, unknown>)[field] = Number(cleaned[field]);
      }
    });

    onSearch(cleaned);
  };

  const handleReset = () => {
    form.resetFields();
    onReset();
  };

  return (
    <div className="px-4 py-6 bg-gray-100 rounded-lg mx-4">
      <Form form={form} layout="vertical" className="filters-form">
        <Form.Item label="Lot Number" name="lot">
          <Input placeholder="Enter lot number" className="w-full" />
        </Form.Item>
        <Form.Item label="Make" name="make">
          <Input placeholder="Enter make" className="w-full" />
        </Form.Item>
        <Form.Item label="Model" name="model">
          <Input placeholder="Enter a model" className="w-full" />
        </Form.Item>
        <button
          type="button"
          onClick={() => setAdvancedFiltersVisible(!advancedFiltersVisible)}
          className="flex items-center gap-2 cursor-pointer border-l border-gray-300 pl-4"
        >
          <FilterIcon />
          <span>Advanced Filters</span>
          <ArrowDownIcon
            width={16}
            height={16}
            className={`${
              advancedFiltersVisible ? "rotate-180" : ""
            } duration-200`}
          />
        </button>
        <div
          className={`col-span-4 grid transition-[grid-template-rows] duration-300 ${
            advancedFiltersVisible ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className="expanded-filters mt-4">
              <ExpandedFilters />
            </div>
          </div>
        </div>
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

export default VehicleFilters;
