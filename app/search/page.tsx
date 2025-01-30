import { searchMulti, checkVidStreamAvailability } from "@/utils/tmdb";
import { MovieCard } from "@/components/movie-card";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = await Promise.resolve(searchParams.q);
  const results = await searchMulti(query);

  // Filter out results without images and check VidStream availability
  const filteredResults = await Promise.all(
    results.results
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
  const availableResults = filteredResults.filter(
    (result) => result.isAvailable
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Search Results for "{query}"</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {availableResults.map((result: any) => (
          <MovieCard key={result.id} movie={result} />
        ))}
      </div>
      {availableResults.length === 0 && (
        <p className="text-center text-muted-foreground">
          No available results found for "{query}"
        </p>
      )}
    </div>
  );
}
