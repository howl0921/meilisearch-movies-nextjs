import type { Movie } from "./types";

export async function fetchMovies(
  query: string = "",
  limit: number = 100,
): Promise<Movie[]> {
  try {
    const params = new URLSearchParams({
      q: query,
      limit: limit.toString(),
    });

    const response = await fetch(`/api/movies?${params}`);

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();
    return data.movies || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}
