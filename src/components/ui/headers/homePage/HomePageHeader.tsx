import { useState } from "react";
import { Plus } from "lucide-react";
import AddCarModal from "../../modals/AddCarModal";
import { Link } from "react-router";

const HomePageHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="border-b border-[#3030303d] w-full py-4 pb-6 mb-4 px-4">
        <section className="w-full flex justify-between items-center gap-2 px-2">
          <Link to="/" className="flex items-center gap-2">
            <h1 className="sm:text-3xl text-xl font-semibold">
              All Vehicles
            </h1>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center bg-black xl:px-4 xl:py-2 px-2 py-1 rounded-lg cursor-pointer hover:bg-[#1d1d1d] transition-colors duration-200"
            >
              <Plus width={20} height={20} color="white" />
              <span className="ml-1 text-sm sm:text-md font-medium text-white">
                Add Car
              </span>
            </button>
          </div>
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
