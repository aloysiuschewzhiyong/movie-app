export const SORT_OPTIONS = {
  movie: [
    { value: "popular", label: "Popular" },
    { value: "top_rated", label: "Top Rated" },
    { value: "vote_average.asc", label: "Lowest Rated" },
    { value: "vote_count.desc", label: "Most Voted" },
    { value: "release_date.desc", label: "Latest Release" },
    { value: "release_date.asc", label: "Oldest Release" },
    { value: "revenue.desc", label: "Highest Revenue" },
    { value: "original_title.asc", label: "Title A-Z" },
    { value: "original_title.desc", label: "Title Z-A" },
  ],
  tv: [
    { value: "popular", label: "Popular" },
    { value: "top_rated", label: "Top Rated" },
    { value: "vote_average.asc", label: "Lowest Rated" },
    { value: "vote_count.desc", label: "Most Voted" },
    { value: "first_air_date.desc", label: "Latest Release" },
    { value: "first_air_date.asc", label: "Oldest Release" },
    { value: "name.asc", label: "Title A-Z" },
    { value: "name.desc", label: "Title Z-A" },
  ],
} as const; 