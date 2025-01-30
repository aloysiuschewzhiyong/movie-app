import {
  getTVShowDetails,
  getEpisodeDetails,
  checkVidStreamAvailability,
} from "@/utils/tmdb";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MoviePlayer } from "@/components/movie-player";

export default async function EpisodePage({
  params,
}: {
  params: { id: string; seasonNumber: string; episodeNumber: string };
}) {
  try {
    // Convert numbers once at the start
    const seasonNum = Number(params.seasonNumber);
    const episodeNum = Number(params.episodeNumber);

    const [tvShow, episode, isAvailable] = await Promise.all([
      getTVShowDetails(params.id), // Use params.id directly
      getEpisodeDetails(params.id, seasonNum, episodeNum),
      checkVidStreamAvailability(params.id, "tv"),
    ]);

    if (!isAvailable) {
      return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">Content Not Available</h1>
          <p className="text-muted-foreground">
            Sorry, this episode is not currently available for streaming.
          </p>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">
          {tvShow.name} - S{seasonNum}E{episodeNum}: {episode.name}
        </h1>
        <div className="mb-8">
          <MoviePlayer
            movieId={params.id}
            mediaType="tv"
            seasonNumber={seasonNum}
            episodeNumber={episodeNum}
          />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            {episode.still_path && (
              <Image
                src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
                alt={episode.name}
                width={500}
                height={281}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            )}
          </div>
          <div className="md:col-span-2">
            <p className="text-lg mb-4">{episode.overview}</p>
            <div className="mb-4">
              <strong>Air Date:</strong> {episode.air_date}
            </div>
            <div className="mb-4">
              <strong>Runtime:</strong> {episode.runtime} minutes
            </div>
            <div className="mb-8">
              <strong>Rating:</strong> {episode.vote_average?.toFixed(1)}/10
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching episode details:", error);
    notFound();
  }
}
