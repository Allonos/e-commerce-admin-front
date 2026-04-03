import { Trash, X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isPending: boolean;
}

const DeleteCarModal = ({ isOpen, onClose, onConfirm, isPending }: Props) => {
  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-200 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Delete Car</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black transition-colors duration-200 cursor-pointer"
          >
            <X width={20} height={20} />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this car? This action cannot be
          undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 rounded-lg py-2 text-sm font-medium hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 bg-[#d4183d] text-white rounded-lg py-2 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#cf3d5a] transition-colors duration-200 cursor-pointer ${
              isPending ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isPending}
          >
            <Trash width={16} height={16} />
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCarModal;
