"use client";

import { useState } from "react";
import { MovieCard } from "./movie-card";
import { MovieCardSkeleton } from "./movie-card-skeleton";

interface MediaGridProps {
  key?: string;
  title?: string;
  initialItems: any[];
  loadMore: (page: number, genreId?: number, sort?: string) => Promise<any>;
  genreId?: number;
  sort?: string;
}

export default function MediaGrid({
  title,
  initialItems,
  loadMore,
  genreId,
  sort,
}: MediaGridProps) {
  const [items, setItems] = useState(initialItems);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = async () => {
    setIsLoading(true);
    const nextPage = page + 1;
    const newItems = await loadMore(nextPage, genreId, sort);
    setItems([...items, ...newItems]);
    setPage(nextPage);
    setIsLoading(false);
  };

  return (
    <div>
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item: any) => (
          <MovieCard key={item.id} movie={item} />
        ))}
        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => (
            <MovieCardSkeleton key={`skeleton-${i}`} />
          ))}
      </div>
      {items.length > 0 && (
        <button
          onClick={handleLoadMore}
          disabled={isLoading}
          className="mt-8 mx-auto block px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition disabled:opacity-50"
        >
          {isLoading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}
