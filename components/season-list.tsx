"use client"

import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

interface Season {
  id: number
  name: string
  season_number: number
  episode_count: number
}

interface SeasonListProps {
  tvShowId: string
  seasons: Season[]
}

export function SeasonList({ tvShowId, seasons }: SeasonListProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {seasons.map((season) => (
        <AccordionItem key={season.id} value={season.id.toString()}>
          <AccordionTrigger>{season.name}</AccordionTrigger>
          <AccordionContent>
            <p className="mb-2">Episodes: {season.episode_count}</p>
            <Button asChild>
              <Link href={`/tv/${tvShowId}/season/${season.season_number}`}>View Episodes</Link>
            </Button>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

