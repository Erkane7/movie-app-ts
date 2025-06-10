import { MovieResponse } from "@/types";

export const getCategory = async (
  category: string,
  page: number = 1
): Promise<MovieResponse | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}movie/${category}?language=en-US&page=${page}`,
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
    console.error("Failed to fetch category movies:", error);
    return undefined;
  }
};
