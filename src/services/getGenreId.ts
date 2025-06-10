import { MovieResponse } from "@/types";

export const getGenreId = async (
  genreIds: string,
  page: number = 1
): Promise<MovieResponse | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}discover/movie?language=en&with_genres=${genreIds}&page=${page}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
      }
    );

    const data: MovieResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch movies by genre ID:", error);
    return undefined;
  }
};
