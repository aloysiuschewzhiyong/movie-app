import { getTVShowDetails, getSeasonDetails } from "@/utils/tmdb";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface SeasonPageProps {
  params: {
    id: string;
    seasonNumber: string;
  };
}

export default async function SeasonPage({ params }: SeasonPageProps) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const { id, seasonNumber } = resolvedParams;

    const [tvShow, season] = await Promise.all([
      getTVShowDetails(id),
      getSeasonDetails(id, Number.parseInt(seasonNumber)),
    ]);

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">
          {tvShow.name} - {season.name}
        </h1>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Image
              src={`https://image.tmdb.org/t/p/w500${season.poster_path}`}
              alt={season.name}
              width={500}
              height={750}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="md:col-span-2">
            <p className="text-lg mb-4">{season.overview}</p>
            <div className="mb-4">
              <strong>Air Date:</strong> {season.air_date}
            </div>
            <div className="mb-8">
              <strong>Episodes:</strong> {season.episodes.length}
            </div>
            <h2 className="text-2xl font-bold mb-4">Episodes</h2>
            <ul className="space-y-4">
              {season.episodes.map((episode) => (
                <li key={episode.id} className="border-b pb-4">
                  <h3 className="text-xl font-semibold mb-2">
                    {episode.episode_number}. {episode.name}
                  </h3>
                  <p className="mb-2">{episode.overview}</p>
                  <Button asChild>
                    <Link
                      href={`/tv/${id}/season/${seasonNumber}/episode/${episode.episode_number}`}
                    >
                      View Episode
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching season details:", error);
    notFound();
  }
}
