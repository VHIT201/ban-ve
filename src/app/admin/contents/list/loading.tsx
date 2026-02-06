export default function ContentsLoading() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6 animate-pulse">
        <div>
          <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-64"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded w-40"></div>
      </div>

      {/* Table Skeleton */}
      <div className="border rounded-lg">
        <div className="p-4 border-b">
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="p-4 border-b flex items-center gap-4 animate-pulse">
            <div className="h-20 w-32 bg-gray-200 rounded"></div>
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-gray-200 rounded w-2/3"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
