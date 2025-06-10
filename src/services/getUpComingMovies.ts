import { MovieResponse } from "@/types";

export const getUpComingMovies = async (): Promise<
  MovieResponse | undefined
> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}movie/upcoming?language=en-US&page=1`,
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
    console.error("Failed to fetch upcoming movies:", error);
    return undefined;
  }
};
