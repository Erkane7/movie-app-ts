import { Movie } from "@/types";

export const getMovieById = async (
  movieId: string
): Promise<Movie | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}movie/${movieId}?language=en-US`,
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

    const movie: Movie = await response.json();
    return movie;
  } catch (error) {
    console.error("Error fetching movie by ID:", error);
    return undefined;
  }
};
