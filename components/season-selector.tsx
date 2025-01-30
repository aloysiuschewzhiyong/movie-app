"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Season {
  id: number
  name: string
  season_number: number
}

interface SeasonSelectorProps {
  tvShowId: string
  seasons: Season[]
}

export function SeasonSelector({ tvShowId, seasons }: SeasonSelectorProps) {
  const [selectedSeason, setSelectedSeason] = useState(seasons[0]?.season_number.toString() || "1")

  const handleSeasonChange = (value: string) => {
    setSelectedSeason(value)
    // You can add additional logic here if needed, such as fetching episodes for the selected season
  }

  return (
    <div className="mb-4">
      <Select value={selectedSeason} onValueChange={handleSeasonChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select a season" />
        </SelectTrigger>
        <SelectContent>
          {seasons.map((season) => (
            <SelectItem key={season.id} value={season.season_number.toString()}>
              {season.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

