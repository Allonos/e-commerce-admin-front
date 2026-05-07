import FeaturedForm from "../components/ui/forms/featuredVehiclePage/featuredForm/FeaturedForm";
import HeroForm from "../components/ui/forms/featuredVehiclePage/heroForm/HeroForm";
import FeaturedVehicleHeader from "../components/ui/headers/fueaturedVehiclePage/FeaturedVehicleHeader";

const FeaturedVehiclesPage = () => {
  return (
    <div>
      <FeaturedVehicleHeader />
      <section className="flex flex-col gap-16 px-4">
        <HeroForm />
        <hr className="border-slate-200" />
        <FeaturedForm />
      </section>
    </div>
  );
};

export default FeaturedVehiclesPage;
