import { searchMulti, checkVidStreamAvailability } from "@/utils/tmdb";
import { MovieCard } from "@/components/movie-card";
import { MovieGrid } from "@/components/movie-grid";

interface SearchPageProps {
  searchParams: Promise<{
    q: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q;

  const [movies, tvShows] = await Promise.all([
    searchMulti(query),
    searchMulti(query),
  ]);

  // Filter out results without images and check VidStream availability
  const filteredMovies = await Promise.all(
    movies.results
      .filter((result: any) => result.poster_path || result.backdrop_path)
      .map(async (result: any) => {
        const isAvailable = await checkVidStreamAvailability(
          result.id.toString(),
          result.media_type
        );
        return { ...result, isAvailable };
      })
  );

  // Filter out results without images and check VidStream availability
  const filteredTVShows = await Promise.all(
    tvShows.results
      .filter((result: any) => result.poster_path || result.backdrop_path)
      .map(async (result: any) => {
        const isAvailable = await checkVidStreamAvailability(
          result.id.toString(),
          result.media_type
        );
        return { ...result, isAvailable };
      })
  );

  // Only show available media
  const availableMovies = filteredMovies.filter((result) => result.isAvailable);

  // Only show available media
  const availableTVShows = filteredTVShows.filter(
    (result) => result.isAvailable
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Search Results for &quot;{query}&quot;
      </h1>

      <MovieGrid
        title="Movies"
        initialMovies={availableMovies}
        showLoadMore={false}
      />

      <MovieGrid
        title="TV Shows"
        initialMovies={availableTVShows}
        showLoadMore={false}
        className="mt-12"
      />
    </div>
  );
}
