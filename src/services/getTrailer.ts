import { VideoResponse } from "@/types";

export const getTrailer = async (
  movieId: string
): Promise<VideoResponse | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}movie/${movieId}/videos?language=en-US`,
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

    const data: VideoResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching trailer:", error);
    return undefined;
  }
};
