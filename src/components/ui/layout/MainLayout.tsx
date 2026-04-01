import type { ReactNode } from "react";
import HomePageHeader from "../headers/homePage/HomePageHeader";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex flex-col items-center justify-center">
      <HomePageHeader />
      <section className="sm:min-w-7xl min-w-75 rounded-2xl">
        {children}
      </section>
    </main>
  );
};

export default MainLayout;
