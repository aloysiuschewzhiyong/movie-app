import { getTVShowDetails, getEpisodeDetails } from "@/utils/tmdb";
import { notFound } from "next/navigation";
import { MoviePlayer } from "@/components/movie-player";
import { BackdropImage } from "@/components/backdrop-image";
import { Metadata } from "next";

interface EpisodePageProps {
  params: Promise<{
    id: string;
    seasonNumber: string;
    episodeNumber: string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  params,
}: EpisodePageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const { id, seasonNumber, episodeNumber } = resolvedParams;

    const [show, episode] = await Promise.all([
      getTVShowDetails(id),
      getEpisodeDetails(id, Number(seasonNumber), Number(episodeNumber)),
    ]);

    return {
      title: `${show.name} - S${seasonNumber}E${episodeNumber}: ${episode.name}`,
      description: episode.overview,
    };
  } catch {
    return {
      title: "Episode Not Found",
    };
  }
}

export default async function EpisodePage({
  params,
  searchParams,
}: EpisodePageProps) {
  try {
    const resolvedParams = await params;
    const { id, seasonNumber, episodeNumber } = resolvedParams;

    const [show, episode] = await Promise.all([
      getTVShowDetails(id),
      getEpisodeDetails(id, Number(seasonNumber), Number(episodeNumber)),
    ]);

    return (
      <>
        <BackdropImage
          src={`https://image.tmdb.org/t/p/original${
            episode.still_path || show.backdrop_path
          }`}
        />
        <div className="container mx-auto px-4 py-8 relative z-10">
          <h1 className="text-3xl font-bold mb-4">
            {show.name} - {episode.name}
          </h1>
          <h2 className="text-xl mb-8 text-muted-foreground">
            Season {seasonNumber}, Episode {episodeNumber}
          </h2>
          <MoviePlayer
            movieId={id}
            episodeNumber={Number(episodeNumber)}
            seasonNumber={Number(seasonNumber)}
            mediaType="tv"
          />
          <div className="mt-8">
            <p className="text-lg text-muted-foreground">{episode.overview}</p>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error loading episode:", error);
    notFound();
  }
}
