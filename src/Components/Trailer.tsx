"use client";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { getTrailer } from "@/services/getTrailer";
import { Button } from "./ui/button";
import { Play, Loader2 } from "lucide-react";
import { TrailerProps, TrailerVideo } from "@/types";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";

const Trailer: React.FC<TrailerProps> = ({ movieId }) => {
  const [trailers, setTrailers] = useState<TrailerVideo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const getTrailerId = async () => {
      if (!movieId) return;
      try {
        const data = await getTrailer(movieId);
        setTrailers(data.results || []);
      } catch (error) {
        console.error("Failed to fetch trailer:", error);
        setTrailers([]);
      } finally {
        setLoading(false);
      }
    };

    getTrailerId();
  }, [movieId]);

  const movieTrailer =
    trailers.find((video) => video.name === "Official Trailer") || trailers[0];

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button disabled={loading || !movieTrailer}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                {movieTrailer ? "Watch trailer" : "No trailer"}
              </>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0 overflow-hidden min-w-fit">
          {movieTrailer && (
            <YouTube
              videoId={movieTrailer.key}
              opts={{
                width: "997",
                height: "567",
                playerVars: {
                  autoplay: 1,
                },
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Trailer;
