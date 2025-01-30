"use server";

import {
  getPopularMovies,
  getPopularTVShows,
  getTopRatedMovies,
  getMoviesByReleaseDate,
  getMoviesByGenreAndSort,
  getTopRatedTVShows,
  getTVShowsByGenreAndSort,
} from "@/utils/tmdb";

export async function loadMoreMovies(
  page: number,
  genreId?: number,
  sort?: string
) {
  try {
    let response;
    if (genreId) {
      response = await getMoviesByGenreAndSort(
        genreId,
        sort || "popularity.desc",
        page
      );
    } else if (sort === "top_rated") {
      response = await getTopRatedMovies(page);
    } else {
      response = await getPopularMovies(page);
    }

    return (
      response?.results?.map((movie: any, index: number) => ({
        ...movie,
        index: index + (page - 1) * 20,
      })) || []
    );
  } catch (error) {
    console.error("Error loading more movies:", error);
    return [];
  }
}

export async function loadMoreTVShows(
  page: number,
  genreId?: number,
  sort?: string
) {
  try {
    const response = await getTVShowsByGenreAndSort(
      genreId || 0,
      sort || "popular",
      page
    );

    return (
      response?.results?.map((show: any, index: number) => ({
        ...show,
        index: index + (page - 1) * 20,
      })) || []
    );
  } catch (error) {
    console.error("Error loading more TV shows:", error);
    return [];
  }
}
