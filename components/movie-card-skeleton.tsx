"use client";

export function MovieCardSkeleton() {
  return (
    <div className="relative h-full">
      <div className="w-full aspect-[2/3] rounded-lg bg-muted animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
        <div className="flex gap-2">
          <div className="h-3 w-16 bg-muted animate-pulse rounded" />
          <div className="h-3 w-16 bg-muted animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
}
