import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  rounded?: "sm" | "md" | "lg" | "full";
}

function Skeleton({ className, rounded = "md", ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-(--bg-muted)",
        {
          "rounded-sm":   rounded === "sm",
          "rounded-md":   rounded === "md",
          "rounded-lg":   rounded === "lg",
          "rounded-full": rounded === "full",
        },
        className
      )}
      {...props}
    />
  );
}

// Pre-built skeleton patterns
function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-3"
          style={{ width: i === lines - 1 ? "60%" : "100%" }}
        />
      ))}
    </div>
  );
}

function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("surface p-5 space-y-4", className)}>
      <div className="flex items-center gap-3">
        <Skeleton className="h-9 w-9" rounded="lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <SkeletonText lines={3} />
    </div>
  );
}

function SkeletonTableRow() {
  return (
    <div className="flex items-center gap-4 px-4 py-3 border-b border-(--border)">
      <Skeleton className="h-4 w-4" rounded="sm" />
      <Skeleton className="h-4 w-36" />
      <Skeleton className="h-5 w-20" rounded="full" />
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-16" />
      <div className="ms-auto">
        <Skeleton className="h-8 w-8" rounded="md" />
      </div>
    </div>
  );
}

function SkeletonKPICard() {
  return (
    <div className="surface p-5">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-8" rounded="md" />
      </div>
      <Skeleton className="h-8 w-20 mb-2" />
      <Skeleton className="h-3 w-32" />
    </div>
  );
}

function SkeletonDashboard() {
  return (
    <div className="space-y-6">
      {/* Hero card */}
      <div className="surface p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-6 w-24" rounded="full" />
        </div>
        <Skeleton className="h-2 w-full rounded-full mb-2" />
        <div className="flex justify-between">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-3 w-28" />
        </div>
      </div>
      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => <SkeletonKPICard key={i} />)}
      </div>
      {/* Table */}
      <div className="surface overflow-hidden">
        <div className="px-4 py-3 border-b border-(--border)">
          <Skeleton className="h-5 w-40" />
        </div>
        {[...Array(5)].map((_, i) => <SkeletonTableRow key={i} />)}
      </div>
    </div>
  );
}

function SkeletonMilestone() {
  return (
    <div className="surface p-5">
      <div className="flex gap-4">
        <Skeleton className="h-4 w-4 mt-0.5 shrink-0" rounded="full" />
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-5 w-20" rounded="full" />
          </div>
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-1.5 w-full" rounded="full" />
          <div className="flex justify-between">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}

export { Skeleton, SkeletonText, SkeletonCard, SkeletonTableRow, SkeletonKPICard, SkeletonDashboard, SkeletonMilestone };
