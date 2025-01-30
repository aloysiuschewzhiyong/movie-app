import { getTVShowDetails, getSeasonDetails } from "@/utils/tmdb";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BackdropImage } from "@/components/backdrop-image";
import { Metadata } from "next";

interface SeasonPageProps {
  params: Promise<{
    id: string;
    seasonNumber: string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  params,
}: SeasonPageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const { id, seasonNumber } = resolvedParams;

    const [show, season] = await Promise.all([
      getTVShowDetails(id),
      getSeasonDetails(id, Number(seasonNumber)),
    ]);

    return {
      title: `${show.name} - Season ${seasonNumber}`,
      description: season.overview,
    };
  } catch {
    return {
      title: "Season Not Found",
    };
  }
}

export default async function SeasonPage({
  params,
  searchParams,
}: SeasonPageProps) {
  try {
    const resolvedParams = await params;
    const { id, seasonNumber } = resolvedParams;

    const [show, season] = await Promise.all([
      getTVShowDetails(id),
      getSeasonDetails(id, Number(seasonNumber)),
    ]);

    return (
      <>
        <BackdropImage
          src={`https://image.tmdb.org/t/p/original${
            season.poster_path || show.backdrop_path
          }`}
        />
        <div className="container mx-auto px-4 py-8 relative z-10">
          <h1 className="text-3xl font-bold mb-4">
            {show.name} - {season.name}
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
                {season.episodes.map((episode: any) => (
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
      </>
    );
  } catch (error) {
    console.error("Error loading season:", error);
    notFound();
  }
}
