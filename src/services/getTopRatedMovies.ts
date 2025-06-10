import { Movie } from "@/types";

interface TopRatedMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const getTopRatedMovies = async (): Promise<
  TopRatedMoviesResponse | undefined
> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}movie/top_rated?language=en-US&page=1`,
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

    const data: TopRatedMoviesResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    return undefined;
  }
};
