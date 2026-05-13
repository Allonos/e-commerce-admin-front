import HomePageHeader from "../headers/homePage/HomePageHeader";

const COL_WIDTHS = [
  "w-20",
  "w-12",
  "w-24",
  "w-20",
  "w-16",
  "w-14",
  "w-16",
  "w-16",
  "w-28",
  "w-16",
  "w-10",
  "w-8",
  "w-20",
  "w-16",
];

const TableRowSkeleton = () => (
  <tr className="border-b border-gray-100">
    {COL_WIDTHS.map((w, i) => (
      <td key={i} className="px-4 py-3">
        <div className={`h-4 bg-gray-200 rounded animate-pulse ${w}`} />
      </td>
    ))}
    <td className="px-4 py-3">
      <div className="flex gap-2">
        <div className="h-7 w-14 bg-gray-200 rounded animate-pulse" />
        <div className="h-7 w-14 bg-gray-200 rounded animate-pulse" />
      </div>
    </td>
  </tr>
);

const HomePageSkeleton = () => {
  return (
    <>
      <HomePageHeader />
      <div className="pt-6 overflow-x-auto">
        <div className="rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {[
                  "Lot",
                  "Image",
                  "Make",
                  "Model",
                  "Type",
                  "Year",
                  "Price",
                  "Status",
                  "Location",
                  "Views",
                  "Priority",
                  "Featured",
                  "Created At",
                  "Owner",
                  "Actions",
                ].map(
                  (col) => (
                    <th key={col} className="px-4 py-3 text-left">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 8 }).map((_, i) => (
                <TableRowSkeleton key={i} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default HomePageSkeleton;
