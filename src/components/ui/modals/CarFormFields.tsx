import type { Dispatch } from "react";
import type { Action } from "../../../utils/reducerActions/addCarModalAction";

const inputCls =
  "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors duration-200";
const labelCls = "block text-sm font-medium text-gray-700 mb-1";

interface Props {
  make: string;
  model: string;
  price: number | undefined;
  location: string;
  date: string;
  type: string;
  formattedDate: string;
  dispatch: Dispatch<Action>;
}

const CarFormFields = (
  { make, model, price, location, date, type, formattedDate, dispatch }: Props,
) => {
  return (
    <>
      <div>
        <label className={labelCls}>Make</label>
        <input
          type="text"
          value={make}
          onChange={(e) =>
            dispatch({ type: "SET_MAKE", payload: e.target.value })}
          placeholder="e.g. Tesla"
          className={inputCls}
        />
      </div>
      <div>
        <label className={labelCls}>Model</label>
        <input
          type="text"
          value={model}
          onChange={(e) =>
            dispatch({ type: "SET_MODEL", payload: e.target.value })}
          placeholder="e.g. Model S"
          className={inputCls}
        />
      </div>
      <div>
        <label className={labelCls}>Price</label>
        <input
          type="text"
          value={price ?? ""}
          onChange={(e) =>
            dispatch({ type: "SET_PRICE", payload: Number(e.target.value) })}
          placeholder="e.g. 42990"
          className={inputCls}
        />
      </div>
      <div>
        <label className={labelCls}>Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) =>
            dispatch({ type: "SET_LOCATION", payload: e.target.value })}
          placeholder="e.g. San Francisco, CA"
          className={inputCls}
        />
      </div>
      <div>
        <label className={labelCls}>Date</label>
        <input
          type="text"
          value={date}
          placeholder="2026"
          onChange={(e) =>
            dispatch({ type: "SET_DATE", payload: e.target.value })}
          className={inputCls}
        />
        {formattedDate && (
          <p className="text-xs text-gray-400 mt-1">{formattedDate}</p>
        )}
      </div>
      <div>
        <label className={labelCls}>Type</label>
        <input
          type="text"
          value={type}
          placeholder="e.g. Sedan"
          onChange={(e) =>
            dispatch({ type: "SET_TYPE", payload: e.target.value })}
          className={inputCls}
        />
      </div>
    </>
  );
};

export default CarFormFields;
