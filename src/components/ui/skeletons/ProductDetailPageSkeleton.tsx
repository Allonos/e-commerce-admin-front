import MainLayout from "../layout/MainLayout";

const ProductDetailPageSkeleton = () => {
  return (
    <MainLayout>
      <div className="flex flex-col items-center xl:flex-row xl:items-start gap-4 animate-pulse">
        {/* Image area */}
        <div className="w-full xl:w-350 px-2 xl:px-0">
          <div className="w-full h-100 xl:h-125 bg-gray-200 rounded-lg" />
        </div>

        {/* Details area */}
        <div className="w-full px-2 xl:px-0 flex flex-col gap-4">
          {/* Make + Model */}
          <div className="flex items-center gap-2">
            <div className="h-8 bg-gray-200 rounded w-28" />
            <div className="h-8 bg-gray-200 rounded w-32" />
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <div className="h-6 bg-gray-200 rounded w-16" />
            <div className="h-9 bg-gray-200 rounded w-28" />
          </div>

          {/* Owner */}
          <div className="flex items-center gap-2">
            <div className="h-5 bg-gray-200 rounded w-8" />
            <div className="h-5 bg-gray-200 rounded w-24" />
          </div>

          {/* Location + Year info cards */}
          <div className="flex gap-2 w-full mt-4">
            <div className="bg-gray-200 w-full rounded-lg h-16" />
            <div className="bg-gray-200 w-full rounded-lg h-16" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetailPageSkeleton;
