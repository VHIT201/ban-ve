export default function DashboardLoading() {
  return (
    <div className="space-y-8">
      {/* Stats Cards Skeleton */}
      <div className="flex items-center gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex-1 border border-gray-200 rounded-lg p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
      
      {/* Chart Skeleton */}
      <div className="border border-gray-200 rounded-lg p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}
