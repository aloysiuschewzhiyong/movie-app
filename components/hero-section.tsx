"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MovieWithPosition {
  id: number;
  backdrop_path: string;
  title?: string;
  bgPosition?: string;
}

export function HeroSection({ movies }: { movies: MovieWithPosition[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const validMovies = movies.filter((m) => m.backdrop_path);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [validMovies.length]);

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % validMovies.length);
    }, 5000);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % validMovies.length);
    startInterval();
  };

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + validMovies.length) % validMovies.length
    );
    startInterval();
  };

  // Helper function to determine optimal background position
  const getBgPosition = (movie: MovieWithPosition) => {
    // You could store these positions in the movie object or determine them based on movie ID
    const positionMap: { [key: number]: string } = {
      238: "50% 25%", // Godfather
      278: "50% 15%", // Shawshank
      680: "50% 0%", // Pulp Fiction
      // Add more movies with their optimal positions
    };

    return positionMap[movie.id] || "50% 15%"; // Default position if not specified
  };

  if (validMovies.length === 0) return null;

  return (
    <div className="relative h-[40vh] md:h-[75vh] flex items-center overflow-hidden">
      {/* Navigation Arrows */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 z-30 hidden sm:block">
        <button
          onClick={handlePrev}
          className="p-1.5 rounded-full bg-background/80 hover:bg-background transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 right-4 z-30 hidden sm:block">
        <button
          onClick={handleNext}
          className="p-1.5 rounded-full bg-background/80 hover:bg-background transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {validMovies.map(
          (movie, index) =>
            index === activeIndex && (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-0"
              >
                <Link
                  href={`/${movie.title ? "movie" : "tv"}/${movie.id}`}
                  className="absolute inset-0 z-10 pointer-events-auto"
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <div
                      className="absolute inset-0 h-[250%] sm:h-[180%] -top-[40%] sm:-top-[20%]"
                      style={{ transform: `translateY(${scrollY * 0.5}px)` }}
                    >
                      <div
                        className="absolute inset-0 bg-cover transition-transform duration-300"
                        style={{
                          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                          backgroundPosition: "50% 30%",
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 relative z-20 pointer-events-none">
        <motion.div className="pointer-events-auto max-w-[90%] md:max-w-none">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 max-w-2xl"
          >
            Unlimited Movies & TV Shows
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-xl"
          >
            Stream your favorite content anytime, anywhere. Start exploring now.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex gap-3"
          >
            <Link
              href="/movies"
              className="bg-primary text-primary-foreground px-4 py-2 text-sm md:text-base rounded-md hover:opacity-90 transition text-center"
            >
              Browse Movies
            </Link>
            <Link
              href="/series"
              className="bg-secondary text-secondary-foreground px-4 py-2 text-sm md:text-base rounded-md hover:opacity-90 transition text-center"
            >
              Browse TV Shows
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
