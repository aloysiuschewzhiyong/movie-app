"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

interface Season {
  id: number;
  name: string;
  season_number: number;
  episode_count: number;
  overview?: string;
}

export function SeasonAccordion({
  seasons,
  tvShowId,
}: {
  seasons: Season[];
  tvShowId: string;
}) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {seasons.map((season) => (
        <AccordionItem key={season.id} value={`season-${season.season_number}`}>
          <AccordionTrigger className="text-lg">
            {season.name} ({season.episode_count} episodes)
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-4">
              {season.overview || "No overview available."}
            </p>
            <Link
              href={`/tv/${tvShowId}/season/${season.season_number}`}
              className="text-primary hover:underline"
            >
              View Episodes →
            </Link>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
