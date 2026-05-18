import { Form, Input } from "antd";
import { FilterIcon } from "../../../../assets/SvgToTsx";
import { ArrowDownIcon } from "lucide-react";
import { useState } from "react";
import ExpandedFilters from "./ExpandedFilters";

const VehicleFilters = () => {
  const [advancedFiltersVisible, setAdvancedFiltersVisible] = useState(false);

  return (
    <div className="px-4 py-6 bg-gray-100 rounded-lg mx-4">
      <Form
        layout="vertical"
        className="filters-form"
      >
        <Form.Item label="Lot Number">
          <Input placeholder="Enter lot number" className="w-full" />
        </Form.Item>
        <Form.Item label="Make">
          <Input placeholder="Enter make" className="w-full" />
        </Form.Item>
        <Form.Item label="Model">
          <Input placeholder="Enter a model" className="w-full" />
        </Form.Item>
        <button
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
      </Form>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ${
          advancedFiltersVisible ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <Form layout="vertical" className="filters-form mt-4">
            <ExpandedFilters />
          </Form>
        </div>
      </div>

      <button className="bg-slate-700 text-white px-4 py-2 rounded-lg cursor-pointer text-[14px] hover:bg-slate-800 transition-colors duration-200 mt-4">
        Search
      </button>
    </div>
  );
};

export default VehicleFilters;
