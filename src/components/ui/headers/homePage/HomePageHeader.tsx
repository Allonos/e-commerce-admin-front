import { useState } from "react";
import { Car, LogOut, Plus } from "lucide-react";
import AddCarModal from "../../modals/AddCarModal";
import { Link } from "react-router";
import { useLogoutServiceMutation } from "../../../../services/react-query/logout/mutation/useLogoutServiceMutation";

const HomePageHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: logout } = useLogoutServiceMutation();

  return (
    <>
      <header className="border-b border-[#3030303d] w-full py-4 mb-4">
        <section className="sm:max-w-7xl w-full mx-auto flex justify-between items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Car width={40} height={40} />
            <h1 className="sm:text-3xl text-xl font-semibold">
              Car Admin Panel
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
            <button className="cursor-pointer" onClick={() => logout()}>
              <LogOut />
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
