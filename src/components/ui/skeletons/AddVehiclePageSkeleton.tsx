const FieldSkeleton = () => (
  <div className="flex flex-col gap-1">
    <div className="h-4 bg-gray-200 rounded w-16" />
    <div className="h-9 bg-gray-200 rounded-lg w-full" />
  </div>
);

const AddVehiclePageSkeleton = () => {
  return (
    <div className="w-full px-4 py-8 animate-pulse">
      {/* Back button */}
      <div className="h-4 bg-gray-200 rounded w-12 mb-6" />

      {/* Title */}
      <div className="h-7 bg-gray-200 rounded w-20 mb-6" />

      <div className="flex flex-col gap-4 w-full">
        <FieldSkeleton />
        <FieldSkeleton />
        <FieldSkeleton />
        <FieldSkeleton />
        <FieldSkeleton />
        <FieldSkeleton />
        <FieldSkeleton />

        {/* Image upload section */}
        <div className="flex flex-col gap-2">
          <div className="h-4 bg-gray-200 rounded w-16" />
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 w-24 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Submit button */}
        <div className="h-10 bg-gray-200 rounded-lg w-full mt-1" />
      </div>
    </div>
  );
};

export default AddVehiclePageSkeleton;
