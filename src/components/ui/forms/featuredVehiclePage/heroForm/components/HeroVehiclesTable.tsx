import { Pencil, Trash2 } from "lucide-react";
import type {
  HeroVehicle,
  HeroVehiclesResponse,
} from "../../../../../../utils/types/heroVehiclesTypes";

interface IProps {
  heroVehicles: HeroVehiclesResponse | undefined;
  onDelete: (id: string) => void;
  onEdit: (vehicle: HeroVehicle) => void;
}

const HeroVehiclesTable = (
  { heroVehicles, onDelete, onEdit }: IProps,
) => {
  return (
    <div className="col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Preview
              </th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Tag Line
              </th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Subtitle
              </th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {(heroVehicles?.heroVehicles.length === 0 || !heroVehicles) && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-8 text-center text-slate-400 text-sm"
                >
                  Hero Vehicle has not been added yet
                </td>
              </tr>
            )}
            {heroVehicles?.heroVehicles.map((vehicle: HeroVehicle) => (
              <tr
                key={vehicle.id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <img
                    src={vehicle.image}
                    alt={vehicle.tagLine}
                    className="w-20 h-12 object-cover rounded shadow-sm border border-slate-200"
                  />
                </td>
                <td className="px-6 py-4 font-medium text-slate-900">
                  {vehicle.tagLine}
                </td>
                <td className="px-6 py-4 text-slate-500">{vehicle.subtitle}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => onEdit(vehicle)}
                    className="text-slate-500 hover:text-slate-900 transition-colors p-2 hover:bg-slate-100 rounded-md mr-2"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(vehicle.id)}
                    className="text-red-500 cursor-pointer hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HeroVehiclesTable;
