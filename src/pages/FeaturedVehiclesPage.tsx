import HeroForm from "../components/ui/forms/featuredVehiclePage/heroForm/HeroForm";
import FeaturedVehicleHeader from "../components/ui/headers/fueaturedVehiclePage/FeaturedVehicleHeader";
import { useGetHeroVehiclesServiceQuery } from "../services/react-query/featuredVehicles/query/useGetHeroVehiclesServiceQuery";

const FeaturedVehiclesPage = () => {
  const { data: heroVehicles, isLoading: heroVehiclesLoading } =
    useGetHeroVehiclesServiceQuery();

  if (heroVehiclesLoading) {
    return null;
  }

  return (
    <div>
      <FeaturedVehicleHeader />
      <section className="flex flex-col gap-16 px-4">
        <HeroForm heroVehicles={heroVehicles} />
        <hr className="border-slate-200" />
      </section>
    </div>
  );
};

export default FeaturedVehiclesPage;
