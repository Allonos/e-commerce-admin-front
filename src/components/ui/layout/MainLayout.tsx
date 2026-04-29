import { Outlet } from "react-router";
import Menu from "../menus/Menu";

const MainLayout = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen overflow-hidden">
      <section className="w-full h-full flex rounded-2xl pb-4">
        <Menu />
        <div className="min-w-75 flex flex-col gap-7 overflow-y-auto flex-1">
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default MainLayout;
