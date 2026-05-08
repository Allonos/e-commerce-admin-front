import { useReducer, useRef } from "react";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { usePostVehicleServiceMutation } from "../../../services/react-query/createVehicle/mutation/usePostVehicleServiceMutation";
import {
  reducer,
  initialState,
} from "../../../utils/reducerActions/addVehicleModalAction";

export const MAX_IMAGES = 4;

export const useAddVehicleForm = (onClose: () => void) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    make,
    model,
    price,
    location,
    date,
    type,
    lot,
    isFeatured,
    images,
    previews,
  } = state;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formattedDate = date ? dayjs(date).format("YYYY") : "";
  const { mutate: postVehicleMutate, isPending } =
    usePostVehicleServiceMutation();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files);
    if ([...images, ...selected].length > MAX_IMAGES) {
      toast.error(`You can only upload up to ${MAX_IMAGES} images.`);
      e.target.value = "";
      return;
    }
    const newPreviews = selected.map((file) => URL.createObjectURL(file));
    dispatch({
      type: "ADD_IMAGES",
      payload: { files: selected, previews: newPreviews },
    });
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    dispatch({ type: "REMOVE_IMAGE", payload: index });
  };

  const handleClose = () => {
    previews.forEach((url) => URL.revokeObjectURL(url));
    dispatch({ type: "RESET" });
    onClose();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!model || !price || !location || !date || !type || !lot) {
      toast.error("All fields are required.");
      return;
    }
    if (images.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }
    if (images.length > MAX_IMAGES) {
      toast.error(`You can only upload up to ${MAX_IMAGES} images.`);
      return;
    }
    postVehicleMutate(
      {
        makeId: make,
        images,
        modelId: model,
        year: date,
        price: Number(price),
        location,
        typeId: type,
        lot,
        isFeatured,
      },
      {
        onSuccess: () => {
          toast.success("Vehicle added successfully!");
          handleClose();
        },
        onError: (error: unknown) => {
          const message = (
            error as { response?: { data?: { error?: string } } }
          )?.response?.data?.error;
          toast.error(message ?? "Something went wrong.");
        },
      },
    );
  };

  return {
    state,
    dispatch,
    fileInputRef,
    formattedDate,
    isPending,
    handleImageChange,
    removeImage,
    handleClose,
    handleSubmit,
  };
};
