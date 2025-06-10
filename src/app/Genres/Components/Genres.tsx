"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getGenres } from "@/services/getGenres";
import { ArrowRight } from "lucide-react";
import { SkeletonCard } from "../../../Components/Skelton";
import { Button } from "../../../Components/ui/button";
import { Genre } from "@/types";
import { parseAsArrayOf, parseAsInteger, useQueryState } from "nuqs";

export function Genres() {
  const router = useRouter();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);

  const [genreIds, setGenreIds] = useQueryState(
    "genreIds",
    parseAsArrayOf(parseAsInteger).withDefault([])
  );

  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);
      try {
        const response = await getGenres();
        setGenres(response?.genres || []);
      } finally {
        setLoading(false);
      }
    };
    fetchGenres();
  }, []);

  const toggleGenre = (id: number, name: string) => {
    const isSelected = genreIds.includes(id);
    const updatedGenreIds = isSelected
      ? genreIds.filter((genreId) => genreId !== id)
      : [...genreIds, id];

    setGenreIds(updatedGenreIds);

    const selectedNames = genres
      .filter((genre) => updatedGenreIds.includes(genre.id))
      .map((genre) => genre.name);

    router.push(
      `/genres?genreId=${updatedGenreIds.join(",")}&name=${selectedNames.join(
        ", "
      )}`
    );
  };

  return (
    <div className="mx-auto ml-2">
      <h2 className="text-lg font-semibold mb-4">
        See lists of movies by genre
      </h2>

      <div className="flex flex-wrap gap-3 max-w-110">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : genres.map((genre) => {
              const isSelected = genreIds.includes(genre.id);

              return (
                <Button
                  key={genre.id}
                  onClick={() => toggleGenre(genre.id, genre.name)}
                  className={`flex items-center gap-1 rounded-full border transition-colors duration-200 ${
                    isSelected
                      ? "bg-gray-400 text-white"
                      : "bg-white text-black hover:bg-gray-200"
                  }`}
                >
                  {genre.name}
                  <ArrowRight className="h-3" />
                </Button>
              );
            })}
      </div>
    </div>
  );
}