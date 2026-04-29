import { ArrowDown } from "lucide-react";
import { NavLink } from "react-router";
import type { ComponentType } from "react";

interface IProps {
  menuItems: {
    label: string;
    icon: ComponentType<{ width: number; height: number; color: string }>;
    links: { label: string; to: string }[];
  }[];
  openIndexes: Set<number>;
  toggle: (index: number) => void;
}

const MenuItem = ({ menuItems, openIndexes, toggle }: IProps) => {
  return (
    <ul className="flex flex-col gap-4">
      {menuItems.map((item, index) => {
        const Icon = item.icon;
        const isOpen = openIndexes.has(index);
        return (
          <li key={item.label}>
            <div
              className="flex justify-between cursor-pointer items-center py-2 hover:bg-slate-800 transition-colors duration-400 px-4 rounded-lg"
              onClick={() => toggle(index)}
            >
              <div className="flex items-center gap-2">
                <Icon width={20} height={20} color="white" />
                <h3 className="text-white font-medium">{item.label}</h3>
              </div>
              <ArrowDown
                width={20}
                height={20}
                color="white"
                className={`transition-transform duration-300 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <ul className="flex flex-col mt-1 ml-8 gap-1">
                {item.links.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `block transition-colors duration-200 px-3 py-2 rounded-md text-sm ${
                          isActive
                            ? "bg-slate-700 text-yellow-400 font-semibold"
                            : "text-slate-300 hover:text-white hover:bg-slate-700"
                        }`}
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default MenuItem;
