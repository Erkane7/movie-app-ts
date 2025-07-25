"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import { SkeletonCard } from "../../../../Components/Skelton";
import { Button } from "@/Components/ui/button";
import { Movie, CastMember, CrewMember } from "@/types"; 

interface Props {
  movie: Movie;
  id: string;
}

export const MovieDescription: React.FC<Props> = ({ movie, id }) => {
  const [cast, setCast] = useState<CastMember[]>([]);
  const [director, setDirector] = useState<CrewMember[]>([]);
  const [writer, setWriter] = useState<CrewMember[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const router = useRouter();

  const getMovieDescription = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}movie/${id}/credits?language=en-US`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        }
      );

      const data = await response.json();
      setCast(data.cast || []);

      const directors = (data.crew || []).filter(
        (person: CrewMember) => person.job === "Director"
      );
      setDirector(directors);

      const writers = (data.crew || []).filter(
        (person: CrewMember) => person.department === "Writing"
      );
      setWriter(writers);
    } catch (error) {
      console.error("Failed to fetch movie description:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleGenre = (genreId: number, name: string) => {
    setSelectedGenres((prev) => {
      const updatedGenres = prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId];

      router.push(`/genres?genreId=${updatedGenres.join(",")}&name=${name}`);
      return updatedGenres;
    });
  };

  useEffect(() => {
    if (!id) return;
    getMovieDescription();
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto mt-10 max-w-[1280px] p-4">
        <SkeletonCard />
      </div>
    );
  }

  return (
    <div className="flex flex-col mx-auto rounded-lg shadow-md mt-10 max-w-[1280px] gap-5 p-4">
      <div className="mb-4">
        <h2 className="text-2xl mb-2 font-semibold">Genres</h2>
        <div className="flex flex-wrap gap-2">
          {movie?.genres?.map((genre) => (
            <Button
              key={genre.id}
              variant="outline"
              className="rounded-full dark:bg-white text-black"
              onClick={() => toggleGenre(genre.id, genre.name)}
            >
              {genre.name}
            </Button>
          ))}
        </div>
      </div>

      <p className="mb-6">{movie?.overview}</p>

      <section className="flex gap-8">
        <h3 className="text-xl font-bold min-w-[100px]">Director</h3>
        <div className="flex gap-4 mt-0.5 flex-wrap">
          {director.map((dir) => (
            <p key={dir.id}>{dir.name}</p>
          ))}
        </div>
      </section>

      <section className="flex gap-8 mt-4">
        <h3 className="text-xl font-bold min-w-[100px]">Writers</h3>
        <div className="flex gap-4 mt-0.5 flex-wrap">
          {writer.slice(0, 3).map((w) => (
            <p key={w.id}>{w.name}</p>
          ))}
        </div>
      </section>

      <section className="flex gap-8 mt-4">
        <h3 className="text-xl font-bold min-w-[100px]">Stars</h3>
        <div className="flex gap-4 mt-0.5 flex-wrap">
          {cast.slice(0, 3).map((star) => (
            <p key={star.id}>{star.name}</p>
          ))}
        </div>
      </section>
    </div>
  );
};
