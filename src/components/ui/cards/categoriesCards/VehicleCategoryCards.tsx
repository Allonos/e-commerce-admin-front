import { useState } from "react";
import { Form, Select } from "antd";
import { PlusIcon } from "lucide-react";

interface IProps {
  cardTitle: string;
  cardIcon: React.ReactNode;
  selected: string;
  onChange: (value: string) => void;
  options: { label: string; value: string; id: string }[];
  placeholder?: string;
  emptyMessage?: string;
  onAdd?: (value: string) => void;
  isPending?: boolean;
}

const VehicleCategoryCards = (
  {
    cardTitle,
    cardIcon,
    selected,
    onChange,
    options,
    placeholder,
    emptyMessage,
    onAdd,
    isPending,
  }: IProps,
) => {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (!inputValue.trim() || !onAdd) return;
    onAdd(inputValue.trim());
    setInputValue("");
  };

  return (
    <div className="shadow-md border border-slate-200 bg-white rounded-lg p-6">
      <div className="flex items-center gap-2">
        {cardIcon}
        <h3 className="text-lg font-semibold">{cardTitle}</h3>
      </div>
      <Form layout="vertical" className="default-form">
        <Form.Item
          label={`Existing ${cardTitle}`}
          className="default-form-item"
        >
          {options.length === 0
            ? (
              <p className="text-sm text-slate-500 italic m-0">
                {emptyMessage ?? "No items added yet"}
              </p>
            )
            : (
              <Select
                value={selected}
                onChange={onChange}
                options={options}
                style={{ textTransform: "capitalize" }}
              />
            )}
        </Form.Item>
      </Form>
      <div className="w-full h-px bg-slate-200" />
      <div className="pt-3">
        <label className="text-[#314158] text-[14px]">
          Add New {cardTitle}
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder={placeholder || `Add New ${cardTitle}`}
            className="w-full py-2 px-2 border border-slate-300 rounded-md text-[12px]"
          />
          <button
            type="button"
            onClick={handleAdd}
            disabled={isPending || !inputValue.trim()}
            className="py-2 px-2 bg-slate-700 rounded-md hover:bg-slate-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PlusIcon className="w-5 h-5 text-slate-200" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleCategoryCards;
