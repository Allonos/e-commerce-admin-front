export type Action =
  | { type: "SET_MAKE"; payload: string }
  | { type: "SET_MODEL"; payload: string }
  | { type: "SET_PRICE"; payload: number }
  | { type: "SET_LOCATION"; payload: string }
  | { type: "SET_DATE"; payload: string }
  | { type: "SET_TYPE"; payload: string }
  | { type: "SET_LOT"; payload: string }
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
