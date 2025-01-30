"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { getSeasonDetails } from "@/utils/tmdb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Episode {
  id: number
  name: string
  episode_number: number
  overview: string
  still_path: string
}

interface Season {
  id: number
  name: string
  season_number: number
}

interface EpisodeListProps {
  tvShowId: string
  seasons: Season[]
}

export function EpisodeList({ tvShowId, seasons }: EpisodeListProps) {
  const [selectedSeason, setSelectedSeason] = useState(seasons[0]?.season_number || 1)
  const [episodes, setEpisodes] = useState<Episode[]>([])

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const seasonDetails = await getSeasonDetails(tvShowId, selectedSeason)
        setEpisodes(seasonDetails.episodes)
      } catch (error) {
        console.error("Error fetching episodes:", error)
      }
    }

    fetchEpisodes()
  }, [tvShowId, selectedSeason])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Episodes</h2>
      <div className="grid gap-4">
        {episodes.map((episode) => (
          <Card key={episode.id}>
            <CardHeader>
              <CardTitle>
                {episode.episode_number}. {episode.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{episode.overview}</p>
              <Button asChild>
                <Link href={`/tv/${tvShowId}/season/${selectedSeason}/episode/${episode.episode_number}`}>
                  Watch Episode
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

