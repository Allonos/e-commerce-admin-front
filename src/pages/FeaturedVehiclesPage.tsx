import FeaturedForm from "../components/ui/forms/featuredVehiclePage/featuredForm/FeaturedForm";
import HeroForm from "../components/ui/forms/featuredVehiclePage/heroForm/HeroForm";
import FeaturedVehicleHeader from "../components/ui/headers/fueaturedVehiclePage/FeaturedVehicleHeader";
import { useGetHeroVehiclesServiceQuery } from "../services/react-query/featuredVehicles/query/useGetHeroVehiclesServiceQuery";

const FeaturedVehiclesPage = () => {
  const { data: heroVehicles, isLoading: heroVehiclesLoading } =
    useGetHeroVehiclesServiceQuery();

  if (heroVehiclesLoading) {
    return;
  }

  return (
    <div>
      <FeaturedVehicleHeader />
      <section className="flex flex-col gap-16 px-4">
        <HeroForm heroVehicles={heroVehicles.data} />
        <hr className="border-slate-200" />
        <FeaturedForm />
      </section>
    </div>
  );
};

export default FeaturedVehiclesPage;
