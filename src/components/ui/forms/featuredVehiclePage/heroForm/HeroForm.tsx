import { Image, Pencil, Trash2 } from "lucide-react";
import tesla from "../../../../../../public/tesla.webp";

const HeroForm = () => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Image className="w-6 h-6" />
        <h2 className="text-[20px] text-[#0F172B] font-bold">
          1. Hero Vehicles
        </h2>
      </div>

      <section className="grid grid-cols-3 gap-10 pt-4">
        <div className="p-6 border border-slate-200 shadow-sm rounded-lg col-span-1">
          <h3 className="text-[18px] text-[#1D293D] font-semibold">
            Add New Hero Car
          </h3>

          {/* <ImageUploadSection /> */}
          <div className="py-3 flex flex-col gap-2">
            <label className="block text-sm text-[#314158]">
              Tag Line
            </label>
            <input
              type="text"
              className="w-full border border-slate-300 rounded-md p-2 text-[15px]"
              placeholder="e.g. Luxury Cars"
            />
          </div>
          <div className="py-3 flex flex-col gap-2">
            <label className="block text-sm text-[#314158]">
              Subtitle
            </label>
            <input
              type="text"
              className="w-full border border-slate-300 rounded-md p-2 text-[15px]"
              placeholder="e.g. Bid on luxury cars"
            />
          </div>
          <button className="self-center w-full bg-slate-900 py-1.5 rounded-lg text-white cursor-pointer hover:bg-slate-800 transition-colors duration-200">
            Save Hero Car
          </button>
        </div>
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
                <tr
                  key={"1"}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <img
                      src={tesla}
                      alt={"car"}
                      className="w-20 h-12 object-cover rounded shadow-sm border border-slate-200"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {"Luxury Cars"}
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {"Bid on luxury cars"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-500 hover:text-slate-900 transition-colors p-2 hover:bg-slate-100 rounded-md mr-2">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-md">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroForm;
