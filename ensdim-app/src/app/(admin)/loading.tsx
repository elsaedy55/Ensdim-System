export default function AdminLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Page header skeleton */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="h-6 w-40 bg-(--bg-muted) rounded-lg" />
          <div className="h-4 w-64 bg-(--bg-muted) rounded" />
        </div>
        <div className="h-9 w-28 bg-(--bg-muted) rounded-xl" />
      </div>

      {/* KPI cards skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="surface h-24 rounded-xl" />
        ))}
      </div>

      {/* Content area skeleton */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 surface h-72 rounded-xl" />
        <div className="surface h-72 rounded-xl" />
      </div>
    </div>
  );
}
