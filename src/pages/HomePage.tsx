import { Calendar, MapPin } from "lucide-react";
import MainLayout from "../components/ui/layout/MainLayout";
import { useGetAdminsCarsServiceQuery } from "../services/react-query/homePage/query/useGetAdminsCarsServiceQuery";

const HomePage = () => {
  const { data: cars, isLoading } = useGetAdminsCarsServiceQuery();

  console.log(cars);

  const noCars = !isLoading && cars?.cars.length === 0;

  if (noCars) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <h2 className="text-xl font-semibold">No cars found</h2>
          <p className="text-gray-500">Please add a car to get started.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="pt-10">
        {!isLoading && cars.cars.map((car) => (
          <div className="flex gap-6">
            <div className="rounded-2xl shadow-md hover:shadow-lg cursor-pointer transition-shadow duration-200 overflow-hidden">
              <div className="h-75 w-87.5">
                <img
                  src="../../../public/tesla.webp"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="pb-2 pt-3 px-4 flex flex-col gap-2">
                <h2 className="text-lg font-semibold">2023 Tesla Model 3</h2>
                <h3>$42,990</h3>
                <div className="pt-2 flex items-center gap-2">
                  <MapPin width={16} height={16} color="#717182" />
                  <span className="text-sm text-[#717182]">
                    San Francisco, CA
                  </span>
                </div>
                <div className="pt-2 flex items-center gap-2">
                  <Calendar width={16} height={16} color="#717182" />
                  <span className="text-sm text-[#717182]">2023</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default HomePage;
