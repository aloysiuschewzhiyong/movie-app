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

export default async function SeriesPage({
  searchParams,
}: {
  searchParams: { genreId?: string; sort?: string };
}) {
  const params = await Promise.resolve(searchParams);
  const genreId = params.genreId ? Number(params.genreId) : undefined;
  const sort = params.sort ?? "popular";

  const [initialTVShows, genres] = await Promise.all([
    getTVShowsByGenreAndSort(genreId, sort),
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
            ? `${sortLabel} ${genreName} TV Shows`
            : `${sortLabel} TV Shows`}
        </h1>
      </div>
      <GenreSelector genres={genres} selectedGenreId={genreId} mediaType="tv" />
      <MovieGrid
        key={`tv-${genreId || "all"}-${sort}`}
        title=""
        initialMovies={initialTVShows.results}
        loadMore={loadMoreTVShows}
        genreId={genreId}
        sort={sort}
      />
    </div>
  );
}
