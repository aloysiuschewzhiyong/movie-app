"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, Search, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { getMovieGenres, getTVGenres } from "@/utils/tmdb";
import Image from "next/image";

interface Genre {
  id: number;
  name: string;
}

const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: delay * 0.1,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

const dropdownVariants = {
  hidden: { opacity: 0, y: -5 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.15,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -5,
    transition: {
      duration: 0.1,
      ease: "easeIn",
    },
  },
};

const searchVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export default function Header() {
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [isMoviesOpen, setIsMoviesOpen] = useState(false);
  const [isSeriesOpen, setIsSeriesOpen] = useState(false);
  const [movieGenres, setMovieGenres] = useState<Genre[]>([]);
  const [tvGenres, setTVGenres] = useState<Genre[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const [movieGenresData, tvGenresData] = await Promise.all([
          getMovieGenres(),
          getTVGenres(),
        ]);
        setMovieGenres(movieGenresData);
        setTVGenres(tvGenresData);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search.trim())}`);
      setSearch("");
      scrollToTop();
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsMoviesOpen(false);
    setIsSeriesOpen(false);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    closeMenu();
    scrollToTop();
  };

  const handleGenreSelect = (genreId: number, mediaType: "movie" | "tv") => {
    const path = `/${
      mediaType === "movie" ? "movies" : "series"
    }?genreId=${genreId}`;
    closeMenu();

    if (
      pathname.startsWith(`/${mediaType === "movie" ? "movies" : "series"}`)
    ) {
      router.replace(path);
    } else {
      router.push(path);
    }
    scrollToTop();
  };

  if (!mounted) {
    return <header className="h-16" />;
  }

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative w-24 h-10">
            <Image
              src="/logo.png"
              alt="Notflix"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-6">
            <ul className="flex space-x-4">
              <motion.li
                custom={0}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
                }}
              >
                <motion.span
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => router.push("/")}
                  className="cursor-pointer hover:text-primary transition-colors"
                >
                  Home
                </motion.span>
              </motion.li>
              <motion.li
                custom={1}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
                }}
              >
                <motion.span
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  onClick={() => router.push("/movies?sort=top_rated")}
                  className="cursor-pointer hover:text-primary transition-colors"
                >
                  Top Rated Movies
                </motion.span>
              </motion.li>
              <motion.li
                custom={2}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
                }}
              >
                <motion.span
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  onClick={() => router.push("/series?sort=top_rated")}
                  className="cursor-pointer hover:text-primary transition-colors"
                >
                  Top Rated Shows
                </motion.span>
              </motion.li>
              <motion.li
                custom={3}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
                }}
              >
                <motion.div
                  onHoverStart={() => setIsMoviesOpen(true)}
                  onHoverEnd={() => setIsMoviesOpen(false)}
                >
                  <motion.span
                    className="cursor-pointer flex items-center hover:text-primary transition-colors"
                    onClick={() => router.push("/movies")}
                  >
                    Movies <ChevronDownIcon className="ml-1 h-4 w-4" />
                  </motion.span>
                  <AnimatePresence mode="wait">
                    {isMoviesOpen && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute left-0 mt-7 w-[600px] rounded-lg shadow-lg bg-background border"
                        style={{
                          transform: "translateX(40%)",
                          right: "0",
                          zIndex: 40,
                        }}
                      >
                        <div className="p-4">
                          <h3 className="text-sm font-medium text-muted-foreground mb-3 px-2">
                            Movie Genres
                          </h3>
                          <div className="grid grid-cols-3 gap-x-4 gap-y-1.5">
                            {movieGenres.map((genre) => (
                              <Link
                                key={genre.id}
                                href={`/movies?genreId=${genre.id}`}
                                className="text-sm px-2.5 py-1.5 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors w-full flex items-center group"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleGenreSelect(genre.id, "movie");
                                }}
                              >
                                <span className="group-hover:translate-x-0.5 transition-transform">
                                  {genre.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.li>
              <motion.li
                custom={4}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
                }}
              >
                <motion.div
                  onHoverStart={() => setIsSeriesOpen(true)}
                  onHoverEnd={() => setIsSeriesOpen(false)}
                >
                  <motion.span
                    className="cursor-pointer flex items-center hover:text-primary transition-colors"
                    onClick={() => router.push("/series")}
                  >
                    Shows <ChevronDownIcon className="ml-1 h-4 w-4" />
                  </motion.span>
                  <AnimatePresence mode="wait">
                    {isSeriesOpen && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute left-0 mt-7 w-[600px] rounded-lg shadow-lg bg-background border"
                        style={{
                          transform: "translateX(40%)",
                          right: "0",
                          zIndex: 40,
                        }}
                      >
                        <div className="p-4">
                          <h3 className="text-sm font-medium text-muted-foreground mb-3 px-2">
                            TV Show Genres
                          </h3>
                          <div className="grid grid-cols-3 gap-x-4 gap-y-1.5">
                            {tvGenres.map((genre) => (
                              <Link
                                key={genre.id}
                                href={`/series?genreId=${genre.id}`}
                                className="text-sm px-2.5 py-1.5 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors w-full flex items-center group"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleGenreSelect(genre.id, "tv");
                                }}
                              >
                                <span className="group-hover:translate-x-0.5 transition-transform">
                                  {genre.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.li>
            </ul>
            <motion.form
              variants={searchVariants}
              initial="hidden"
              animate="visible"
              onSubmit={handleSearch}
              className="flex space-x-2"
            >
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] md:w-[300px] transition-all duration-300 ease-in-out focus:w-[350px]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 17,
                }}
              >
                <Button type="submit" variant="outline" size="icon">
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
              </motion.div>
            </motion.form>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <ThemeToggle />
            </motion.div>
          </nav>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 xl:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence mode="wait">
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: "auto",
                transition: {
                  height: {
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1],
                  },
                  opacity: {
                    duration: 0.2,
                    delay: 0.1,
                  },
                },
              }}
              exit={{
                opacity: 0,
                height: 0,
                transition: {
                  height: {
                    duration: 0.2,
                    ease: [0.4, 0, 0.2, 1],
                  },
                  opacity: {
                    duration: 0.1,
                  },
                },
              }}
              className="xl:hidden overflow-hidden"
            >
              <nav className="py-4">
                <ul className="space-y-4">
                  <li>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => handleNavigation("/")}
                    >
                      Home
                    </Button>
                  </li>
                  <li>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => handleNavigation("/movies?sort=top_rated")}
                    >
                      Top Rated Movies
                    </Button>
                  </li>
                  <li>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => handleNavigation("/series?sort=top_rated")}
                    >
                      Top Rated Shows
                    </Button>
                  </li>
                  <li>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => setIsMoviesOpen(!isMoviesOpen)}
                    >
                      Movies
                      <ChevronDownIcon className="ml-2 h-4 w-4" />
                    </Button>
                    <AnimatePresence mode="wait">
                      {isMoviesOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-4 space-y-2 mt-2"
                        >
                          {movieGenres.map((genre) => (
                            <Button
                              key={genre.id}
                              variant="ghost"
                              className="w-full justify-start text-sm"
                              onClick={() =>
                                handleGenreSelect(genre.id, "movie")
                              }
                            >
                              {genre.name}
                            </Button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                  <li>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => setIsSeriesOpen(!isSeriesOpen)}
                    >
                      Shows
                      <ChevronDownIcon className="ml-2 h-4 w-4" />
                    </Button>
                    <AnimatePresence mode="wait">
                      {isSeriesOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-4 space-y-2 mt-2"
                        >
                          {tvGenres.map((genre) => (
                            <Button
                              key={genre.id}
                              variant="ghost"
                              className="w-full justify-start text-sm"
                              onClick={() => handleGenreSelect(genre.id, "tv")}
                            >
                              {genre.name}
                            </Button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                  <li>
                    <form onSubmit={handleSearch} className="flex space-x-2">
                      <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <Button type="submit" variant="ghost" size="icon">
                        <Search className="h-5 w-5" />
                      </Button>
                    </form>
                  </li>
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
