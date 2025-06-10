import { GenreResponse } from "@/types";

export const getGenres = async (): Promise<GenreResponse | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}genre/movie/list?language=en`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
      }
    );

    const data: GenreResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch genres:", error);
    return undefined;
  }
};
