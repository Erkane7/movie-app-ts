import { Movie } from "@/types";

interface PopularMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const getPopularMovies = async (): Promise<
  PopularMoviesResponse | undefined
> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}movie/popular?language=en-US&page=1`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: PopularMoviesResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch popular movies:", error);
    return undefined;
  }
};
