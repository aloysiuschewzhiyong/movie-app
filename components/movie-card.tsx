"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "next-themes";
import { Star, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getLanguageName, getContentRating } from "@/utils/helpers";

interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  vote_average?: number;
  media_type?: "movie" | "tv";
  release_date?: string;
  first_air_date?: string;
  vote_count?: number;
  original_language?: string;
  adult?: boolean;
  popularity?: number;
  content_rating?: string;
}

interface MovieCardProps {
  movie: MediaItem;
}

export function MovieCard({ movie }: MovieCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { theme, systemTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("dark");

  const title = movie.title || movie.name || "Unknown Title";
  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.svg";
  const mediaType = movie.media_type || (movie.title ? "movie" : "tv");

  useEffect(() => {
    setCurrentTheme(
      theme === "system"
        ? (systemTheme as "light" | "dark")
        : (theme as "light" | "dark")
    );
  }, [theme, systemTheme]);

  const placeholderColor =
    currentTheme === "dark" ? "bg-gray-800" : "bg-gray-200";

  const getRatingColor = (rating?: number) => {
    if (!rating) return "text-gray-400";
    if (rating >= 8) return "text-green-500";
    if (rating >= 6) return "text-yellow-500";
    return "text-red-500";
  };

  const formattedRating =
    typeof movie.vote_average === "number"
      ? movie.vote_average.toFixed(1)
      : Number(movie.vote_average).toFixed(1);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group w-full"
    >
      <Link href={`/${mediaType}/${movie.id}`} passHref>
        <Card className="overflow-hidden cursor-pointer transition-all duration-200 shadow-md hover:shadow-xl group-hover:shadow-[0_0_2rem_-0.5rem_#fff8] dark:group-hover:shadow-[0_0_2rem_-0.5rem_#0008]">
          <CardContent className="p-0">
            <div className="relative aspect-[2/3]">
              <Badge
                variant="secondary"
                className="absolute top-2 left-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] sm:text-xs"
              >
                {mediaType === "movie" ? "Movie" : "TV Show"}
              </Badge>

              <div className="absolute top-2 right-2 z-20 bg-black/60 backdrop-blur-sm px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-md flex items-center gap-1 sm:gap-1.5">
                <Star
                  className={`h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 ${getRatingColor(
                    movie.vote_average
                  )} fill-current`}
                />
                <span className="text-[11px] sm:text-xs md:text-sm font-medium text-white">
                  {formattedRating}
                </span>
              </div>

              <Image
                unoptimized
                src={posterPath || "/placeholder.svg"}
                alt={title}
                fill
                sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, 16vw"
                className={`object-cover transition-all duration-300 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                } group-hover:brightness-110`}
                onLoad={() => setImageLoaded(true)}
              />

              {!imageLoaded && (
                <div
                  className={`absolute inset-0 ${placeholderColor} animate-pulse`}
                />
              )}
            </div>
            <div className="p-2 sm:p-3 md:p-4">
              <h3 className="font-semibold text-sm  lg:text-base xl:text-lg group-hover:text-primary transition-colors line-clamp-2 decoration-primary group-hover:underline-offset-4 group-hover:underline">
                {title}
              </h3>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2  mt-2 sm:mt-2.5 md:mt-3 text-muted-foreground border-t border-border/50 pt-2 sm:pt-2.5 md:pt-3">
                <div className="flex items-center gap-1 sm:gap-1.5 bg-muted/50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md">
                  <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5" />
                  <span className="text-[9px] sm:text-[10px] md:text-xs font-medium">
                    {movie.release_date?.slice(0, 4) ||
                      movie.first_air_date?.slice(0, 4) ||
                      "N/A"}
                  </span>
                </div>
                <div className="text-[9px] sm:text-[10px] md:text-xs font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md bg-muted/50">
                  {movie.original_language
                    ? getLanguageName(movie.original_language)
                    : "N/A"}
                </div>
                <div className="text-[9px] sm:text-[10px] md:text-xs font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md bg-muted/50">
                  {movie.content_rating}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
