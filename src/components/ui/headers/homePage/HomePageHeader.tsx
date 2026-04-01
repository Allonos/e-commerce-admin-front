import { useState } from "react";
import { Car, Plus } from "lucide-react";
import AddCarModal from "../../modals/AddCarModal";

const HomePageHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="border-b border-[#3030303d] w-full py-4 mb-4">
        <section className="sm:max-w-7xl max-w-75 mx-auto flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <Car width={40} height={40} />
            <h1 className="text-3xl font-semibold">Car Admin Panel</h1>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center bg-black px-4 py-2 rounded-lg cursor-pointer hover:bg-[#1d1d1d] transition-colors duration-200"
          >
            <Plus width={20} height={20} color="white" />
            <span className="ml-1 text-md font-medium text-white">
              Add Car
            </span>
          </button>
        </section>
      </header>

      <AddCarModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default HomePageHeader;
