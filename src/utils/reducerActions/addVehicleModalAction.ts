import type {
  FuelType,
  Transmission,
  VehicleCondition,
} from "../types/vehicleTypes";

export type Action =
  | { type: "SET_MAKE"; payload: string }
  | { type: "SET_MODEL"; payload: string }
  | { type: "SET_PRICE"; payload: number }
  | { type: "SET_LOCATION"; payload: string }
  | { type: "SET_DATE"; payload: string }
  | { type: "SET_TYPE"; payload: string }
  | { type: "SET_LOT"; payload: string }
  | { type: "SET_IS_FEATURED"; payload: boolean }
  | { type: "SET_STATUS"; payload: string }
  | { type: "SET_PRIORITY"; payload: number }
  | { type: "SET_MILEAGE"; payload: number }
  | { type: "SET_ENGINE"; payload: number }
  | { type: "SET_TRANSMISSION"; payload: Transmission }
  | { type: "SET_CONDITION"; payload: VehicleCondition }
  | { type: "SET_FUEL_TYPE"; payload: FuelType }
  | { type: "ADD_IMAGES"; payload: { files: File[]; previews: string[] } }
  | { type: "REMOVE_IMAGE"; payload: number }
  | { type: "RESET" };

export type State = {
  make: string;
  model: string;
  price: number | undefined;
  location: string;
  date: string;
  type: string;
  lot: string;
  isFeatured: boolean;
  status: string;
  priority: number;
  mileage: number;
  engine: number;
  transmission: Transmission;
  condition: VehicleCondition;
  fuelType: FuelType;
  images: File[];
  previews: string[];
};

export const initialState: State = {
  make: "",
  model: "",
  price: undefined,
  location: "",
  date: "",
  type: "",
  lot: "",
  isFeatured: false,
  status: "active",
  priority: 0,
  mileage: 0,
  engine: 0,
  transmission: "AUTOMATIC",
  condition: "USED",
  fuelType: "GASOLINE",
  images: [],
  previews: [],
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_MAKE":
      return { ...state, make: action.payload };
    case "SET_MODEL":
      return { ...state, model: action.payload };
    case "SET_PRICE":
      return { ...state, price: action.payload };
    case "SET_LOCATION":
      return { ...state, location: action.payload };
    case "SET_DATE":
      return { ...state, date: action.payload };
    case "SET_TYPE":
      return { ...state, type: action.payload };
    case "SET_LOT":
      return { ...state, lot: action.payload };
    case "SET_IS_FEATURED":
      return { ...state, isFeatured: action.payload };
    case "SET_STATUS":
      return { ...state, status: action.payload };
    case "SET_PRIORITY":
      return { ...state, priority: action.payload };
    case "SET_MILEAGE":
      return { ...state, mileage: action.payload };
    case "SET_ENGINE":
      return { ...state, engine: action.payload };
    case "SET_TRANSMISSION":
      return { ...state, transmission: action.payload };
    case "SET_CONDITION":
      return { ...state, condition: action.payload };
    case "SET_FUEL_TYPE":
      return { ...state, fuelType: action.payload };
    case "ADD_IMAGES":
      return {
        ...state,
        images: [...state.images, ...action.payload.files],
        previews: [...state.previews, ...action.payload.previews],
      };
    case "REMOVE_IMAGE":
      return {
        ...state,
        images: state.images.filter((_, i) => i !== action.payload),
        previews: state.previews.filter((_, i) => i !== action.payload),
      };
    case "RESET":
      return initialState;
  }
};
