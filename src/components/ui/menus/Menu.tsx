import {
  Car,
  LogOut,
  NotepadText,
  Package,
  Settings,
  UsersRound,
} from "lucide-react";
import { useState } from "react";
import MenuItem from "./components/MenuItem";
import { useAuthStore } from "../../../store/useAuthStore";
import { useLogoutServiceMutation } from "../../../services/react-query/logout/mutation/useLogoutServiceMutation";

const inventoryLinks = [
  { label: "All Vehicles", to: "/" },
  { label: "Featured / Hero Cars / Popular Cars", to: "/inventory/featured" },
  { label: "Categories & Makes", to: "/inventory/categories" },
];

const usersLinks = [
  { label: "All Users", to: "/users/all" },
  { label: "Dealer Accounts", to: "/users/dealers" },
  { label: "Banned / Flagged Users", to: "/users/banned" },
];

const LotsLinks = [
  { label: "Lot Management", to: "/lots/management" },
];

const settingsLinks = [
  { label: "Role & Permissions (Admin Roles)", to: "/settings/roles" },
];

const menuItems = [
  {
    label: "Inventory Management",
    icon: Package,
    links: inventoryLinks,
  },
  {
    label: "User & Accounts",
    icon: UsersRound,
    links: usersLinks,
  },
  {
    label: "Lots & Titles",
    icon: NotepadText,
    links: LotsLinks,
  },
  {
    label: "Settings",
    icon: Settings,
    links: settingsLinks,
  },
];

const Menu = () => {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set([0]));
  const { authUser } = useAuthStore();

  const { mutate: logout, isPending } = useLogoutServiceMutation();

  const toggle = (index: number) =>
    setOpenIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  return (
    <>
      {isPending && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#93929280] z-50">
          <h3 className="text-2xl text-black">Logging out...</h3>
        </div>
      )}
      <div className="w-80 flex flex-col justify-between h-screen bg-slate-900">
        <div>
          <div className="border-b border-[#c7c7c765] w-full py-4 pb-5 mb-4 px-4 flex items-center gap-2">
            <Car width={40} height={40} color="white" />
            <h2 className="sm:text-3xl text-xl text-white font-semibold">
              Cars
            </h2>
          </div>
          <nav className="px-4">
            <MenuItem
              menuItems={menuItems}
              openIndexes={openIndexes}
              toggle={toggle}
            />
          </nav>
        </div>
        <div className="pt-3 pb-3 mb-3 mx-4 rounded-2xl px-4 bg-slate-800 flex justify-between items-center">
          <div>
            <h3 className="text-sm text-[#c7c7c765]">Logged in as</h3>
            <p className="text-white font-medium">{authUser?.username}</p>
          </div>
          <div className="cursor-pointer" onClick={() => logout()}>
            <LogOut color="white" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
