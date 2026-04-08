import MainLayout from "../layout/MainLayout";

const CarCardSkeleton = () => (
  <div className="rounded-2xl lg:w-full max-w-97.5 xl:w-97.5 shadow-md overflow-hidden animate-pulse">
    <div className="h-75 w-full bg-gray-200" />
    <div className="pb-2 pt-3 px-4 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="h-5 bg-gray-200 rounded w-20" />
        <div className="h-5 bg-gray-200 rounded w-24" />
      </div>
      <div className="h-4 bg-gray-200 rounded w-16" />
      <div className="pt-2 flex items-center gap-2">
        <div className="h-4 w-4 bg-gray-200 rounded-full" />
        <div className="h-4 bg-gray-200 rounded w-32" />
      </div>
      <div className="pt-2 flex items-center gap-2">
        <div className="h-4 w-4 bg-gray-200 rounded-full" />
        <div className="h-4 bg-gray-200 rounded w-40" />
      </div>
      <div className="pt-2 flex items-center gap-2">
        <div className="h-4 w-4 bg-gray-200 rounded-full" />
        <div className="h-4 bg-gray-200 rounded w-28" />
      </div>
    </div>
  </div>
);

const HomePageSkeleton = () => {
  return (
    <MainLayout>
      <div className="pt-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-items-center gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <CarCardSkeleton key={i} />
        ))}
      </div>
    </MainLayout>
  );
};

export default HomePageSkeleton;
