"use client";

import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Genre {
  id: number;
  name: string;
}

interface GenreSelectorProps {
  genres: Genre[];
  selectedGenreId?: number;
  mediaType: "movie" | "tv";
}

export function GenreSelector({
  genres,
  selectedGenreId,
  mediaType,
}: GenreSelectorProps) {
  const router = useRouter();

  const handleGenreClick = (genreId: number | null) => {
    const path = mediaType === "movie" ? "/movies" : "/series";
    if (genreId === null) {
      router.push(path);
    } else {
      router.push(`${path}?genreId=${genreId}`);
    }
  };

  const handleSelectChange = (value: string) => {
    const genreId = value === "all" ? null : Number(value);
    handleGenreClick(genreId);
  };

  return (
    <>
      {/* Desktop View - Badges */}
      <div className="hidden md:flex flex-wrap gap-2 mb-8">
        <Badge
          variant={selectedGenreId === undefined ? "default" : "outline"}
          className="cursor-pointer text-sm px-4 py-1 hover:opacity-80"
          onClick={() => handleGenreClick(null)}
        >
          All Genres
        </Badge>
        {genres.map((genre) => (
          <Badge
            key={genre.id}
            variant={selectedGenreId === genre.id ? "default" : "outline"}
            className="cursor-pointer text-sm px-4 py-1 hover:opacity-80"
            onClick={() => handleGenreClick(genre.id)}
          >
            {genre.name}
          </Badge>
        ))}
      </div>

      {/* Mobile/Tablet View - Select Dropdown */}
      <div className="md:hidden mb-8">
        <Select
          value={selectedGenreId?.toString() || "all"}
          onValueChange={handleSelectChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>
            {genres.map((genre) => (
              <SelectItem key={genre.id} value={genre.id.toString()}>
                {genre.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
