import { MovieGrid } from "@/components/movie-grid";
import {
  getPopularMovies,
  getPopularTVShows,
  getMovieGenres,
  getTVGenres,
} from "@/utils/tmdb";
import { loadMoreMovies, loadMoreTVShows } from "./actions";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { HeroSection } from "@/components/hero-section";

export default async function Home() {
  const [popularMovies, popularTVShows, movieGenres, tvGenres] =
    await Promise.all([
      getPopularMovies(),
      getPopularTVShows(),
      getMovieGenres(),
      getTVGenres(),
    ]);

  const getRandomGenre = (genres: any[]) => {
    return genres[Math.floor(Math.random() * genres.length)];
  };

  const randomMovieGenre = getRandomGenre(movieGenres);
  const randomTVGenre = getRandomGenre(tvGenres);

  const validMovies = popularMovies.results.filter(
    (m) => m.backdrop_path && m.poster_path && m.vote_average > 0
  );

  const moviesByGenre = validMovies.filter((movie: any) =>
    movie.genre_ids.includes(randomMovieGenre.id)
  );
  const tvShowsByGenre = popularTVShows.results.filter((show: any) =>
    show.genre_ids.includes(randomTVGenre.id)
  );

  return (
    <div>
      <HeroSection movies={popularMovies.results} />

      {/* Content Sections */}
      <div className="container mx-auto px-6 py-12 space-y-16">
        {/* Popular Movies Section */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Popular Movies</h2>
            <Link
              href="/movies"
              className="flex items-center text-primary hover:underline"
            >
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <MovieGrid
            title=""
            initialMovies={popularMovies.results.slice(0, 10)}
            showLoadMore={false}
          />
        </section>

        {/* Popular TV Shows Section */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Popular TV Shows</h2>
            <Link
              href="/series"
              className="flex items-center text-primary hover:underline"
            >
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <MovieGrid
            title=""
            initialMovies={popularTVShows.results.slice(0, 10)}
            showLoadMore={false}
          />
        </section>

        {/* Genre Sections */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">
              {randomMovieGenre.name} Movies
            </h2>
            <Link
              href={`/movies?genreId=${randomMovieGenre.id}`}
              className="flex items-center text-primary hover:underline"
            >
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <MovieGrid
            title=""
            initialMovies={moviesByGenre.slice(0, 10)}
            showLoadMore={false}
          />
        </section>

        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">
              {randomTVGenre.name} TV Shows
            </h2>
            <Link
              href={`/series?genreId=${randomTVGenre.id}`}
              className="flex items-center text-primary hover:underline"
            >
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <MovieGrid
            title=""
            initialMovies={tvShowsByGenre.slice(0, 10)}
            showLoadMore={false}
          />
        </section>
      </div>
    </div>
  );
}
