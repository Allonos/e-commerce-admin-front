import type { CarResponse } from "../../../utils/types/carTypes";

interface IProps {
  cars: CarResponse | undefined;
  setPage: (page: number) => void;
}

const getPageNumbers = (
  currentPage: number,
  totalPages: number,
): (number | "...")[] => {
  const delta = 3;
  const pageSet = new Set<number>();

  pageSet.add(1);

  for (
    let i = Math.max(1, currentPage - delta);
    i <= Math.min(totalPages, currentPage + delta);
    i++
  ) {
    pageSet.add(i);
  }

  for (let i = Math.max(1, totalPages - 2); i <= totalPages; i++) {
    pageSet.add(i);
  }

  const sorted = Array.from(pageSet).sort((a, b) => a - b);
  const result: (number | "...")[] = [];

  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push("...");
    result.push(sorted[i]);
  }

  return result;
};

const DefaultPagination = ({ cars, setPage }: IProps) => {
  return (
    <>
      {cars && cars.totalPages > 1 && (
        <div className="flex items-center justify-center gap-1 px-4 pb-10">
          {getPageNumbers(cars.page, cars.totalPages).map((p, i) =>
            p === "..."
              ? (
                <span
                  key={`ellipsis-${i}`}
                  className="w-9 h-9 flex items-center justify-center text-sm text-gray-400 select-none"
                >
                  …
                </span>
              )
              : (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer ${
                    p === cars.page
                      ? "bg-blue-500 text-white"
                      : "bg-[#ECECF0] hover:bg-[#d5d5d5]"
                  }`}
                >
                  {p}
                </button>
              )
          )}
        </div>
      )}
    </>
  );
};

export default DefaultPagination;
