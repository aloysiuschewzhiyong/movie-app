import {
  getPopularMovies,
  getMovieGenres,
  getTopRatedMovies,
  getMoviesByReleaseDate,
  getMoviesByGenreAndSort,
} from "@/utils/tmdb";
import { MovieGrid } from "@/components/movie-grid";
import { GenreSelector } from "@/components/genre-selector";
import { loadMoreMovies } from "../actions";
import { SORT_OPTIONS } from "@/utils/sort-options";

export const revalidate = 0;

interface MoviesPageProps {
  searchParams: Promise<{
    genreId?: string;
    sort?: string;
  }>;
}

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  const params = await searchParams;
  const genreId = params.genreId ? Number(params.genreId) : undefined;
  const sort = params.sort ?? "popular";

  const [initialMovies, genres] = await Promise.all([
    getMoviesByGenreAndSort(genreId, sort),
    getMovieGenres(),
  ]);

  const genreName = genreId
    ? genres.find((g) => g.id === genreId)?.name
    : undefined;

  const sortLabel =
    SORT_OPTIONS.movie.find((opt) => opt.value === sort)?.label ?? "Popular";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          {genreName
            ? `${sortLabel} ${genreName} Movies`
            : `${sortLabel} Movies`}
        </h1>
      </div>
      <GenreSelector
        genres={genres}
        selectedGenreId={genreId}
        mediaType="movie"
      />
      <MovieGrid
        key={`movies-${genreId || "all"}-${sort}`}
        title=""
        initialMovies={initialMovies.results}
        loadMore={loadMoreMovies}
        genreId={genreId}
        sort={sort}
      />
    </div>
  );
}
