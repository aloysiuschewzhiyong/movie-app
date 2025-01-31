"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { MovieCard } from "./movie-card";
import { MovieCardSkeleton } from "./movie-card-skeleton";
import { motion } from "framer-motion";
import { AdvancedFilters } from "./advanced-filters";
import { Loader2 } from "lucide-react";

interface MovieGridProps {
  title?: string;
  initialMovies: any[];
  loadMore?: (page: number, genreId?: number, sort?: string) => Promise<any>;
  genreId?: number;
  className?: string;
  showLoadMore?: boolean;
  sort?: string;
}

export function MovieGrid({
  title,
  initialMovies,
  loadMore,
  genreId,
  className = "",
  showLoadMore = true,
  sort,
}: MovieGridProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = searchParams?.get("sort") ?? "popular";
  const showFilters = pathname === "/movies" || pathname === "/series";

  const [movies, setMovies] = useState(initialMovies);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!initialMovies.length);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);
  const [ratingRange, setRatingRange] = useState<[number, number]>([0, 10]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [selectedContentRating, setSelectedContentRating] =
    useState<string>("all");

  // For home page (when showLoadMore is false), just show initialMovies
  if (!showLoadMore) {
    return (
      <section>
        {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
        <div
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3 lg:gap-4 ${className}`}
        >
          {initialMovies.map((movie, index) => (
            <motion.div
              key={`${movie.id}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  const handleSortChange = (value: string) => {
    // Implement sort logic
    console.log("Sort changed:", value);
  };

  const handleRatingChange = (range: [number, number]) => {
    setRatingRange(range);
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleContentRatingChange = (rating: string) => {
    setSelectedContentRating(rating);
  };

  // For pages with infinite scroll
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading && loadMore) {
        setLoading(true);
        const nextPage = page + 1;
        loadMore(nextPage, genreId, currentSort)
          .then((newMovies) => {
            if (newMovies.length === 0) {
              setHasMore(false);
              return;
            }
            setMovies((prev) => [...prev, ...newMovies]);
            setPage(nextPage);
          })
          .catch((error) => {
            console.error("Error loading more movies:", error);
            setHasMore(false);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
    [hasMore, loading, loadMore, page, genreId, currentSort]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    });

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, [handleObserver]);

  const filteredMovies = movies.filter((movie) => {
    const ratingMatch =
      movie.vote_average >= ratingRange[0] &&
      movie.vote_average <= ratingRange[1];
    const languageMatch =
      selectedLanguage === "all" ||
      movie.original_language === selectedLanguage;
    const contentRatingMatch =
      selectedContentRating === "all" ||
      movie.content_rating === selectedContentRating;

    return ratingMatch && languageMatch && contentRatingMatch;
  });

  if (initialLoading) {
    return (
      <section>
        {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
        <div
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3 lg:gap-4 ${className}`}
        >
          {[...Array(10)].map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section>
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      {showFilters && (
        <AdvancedFilters
          onSortChange={handleSortChange}
          onRatingChange={handleRatingChange}
          onLanguageChange={handleLanguageChange}
          onContentRatingChange={handleContentRatingChange}
        />
      )}

      <div
        className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3 lg:gap-4 ${className}`}
      >
        {filteredMovies.map((movie, index) => (
          <motion.div
            key={`${movie.id}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
          >
            <MovieCard movie={movie} />
          </motion.div>
        ))}
        {loading && (
          <>
            <MovieCardSkeleton />
            <MovieCardSkeleton />
            <MovieCardSkeleton />
            <MovieCardSkeleton />
            <MovieCardSkeleton />
          </>
        )}
      </div>

      {showLoadMore && loadMore && (
        <div
          ref={loader}
          className="w-full h-20 flex items-center justify-center"
        >
          {loading && (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-muted-foreground">Loading more...</span>
            </div>
          )}
          {!hasMore && movies.length > 0 && (
            <p className="text-muted-foreground">No more items to load</p>
          )}
        </div>
      )}
    </section>
  );
}
