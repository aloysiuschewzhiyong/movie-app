import {
  getPopularTVShows,
  getTVGenres,
  getTopRatedTVShows,
  getTVShowsByGenreAndSort,
} from "@/utils/tmdb";
import { MovieGrid } from "@/components/movie-grid";
import { GenreSelector } from "@/components/genre-selector";
import { loadMoreTVShows } from "../actions";
import { SORT_OPTIONS } from "@/utils/sort-options";

export const revalidate = 0;

interface SeriesPageProps {
  searchParams: Promise<{
    genreId?: string;
    sort?: string;
  }>;
}

export default async function SeriesPage({ searchParams }: SeriesPageProps) {
  const resolvedParams = await searchParams;
  const genreId = resolvedParams.genreId
    ? Number(resolvedParams.genreId)
    : undefined;
  const sort = resolvedParams.sort;

  const [initialShows, genres] = await Promise.all([
    getTVShowsByGenreAndSort(genreId || 0, sort || "popular", 1),
    getTVGenres(),
  ]);

  const genreName = genreId
    ? genres.find((g) => g.id === genreId)?.name
    : undefined;

  // Get the sort label from SORT_OPTIONS
  const sortLabel =
    SORT_OPTIONS.tv.find((opt) => opt.value === sort)?.label ?? "Popular";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          {genreName
            ? `${sortLabel} ${genreName} Series`
            : `${sortLabel} Series`}
        </h1>
      </div>
      <GenreSelector genres={genres} selectedGenreId={genreId} mediaType="tv" />
      <MovieGrid
        key={`series-${genreId || "all"}-${sort}`}
        title=""
        initialMovies={initialShows.results}
        loadMore={loadMoreTVShows}
        genreId={genreId}
        sort={sort}
      />
    </div>
  );
}
