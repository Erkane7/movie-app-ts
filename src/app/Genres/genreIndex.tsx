import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { parseAsInteger, useQueryState } from "nuqs";
import { getGenreId } from "@/services/getGenreId";
import { MovieCard } from "@/Components/MovieCard";
import { Genres } from "./Components/Genres";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/Components/ui/button";

interface Movie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
}

interface GenreData {
  total_results: number;
  total_pages: number;
  results: Movie[];
}

export default function CategorMorePage() {
  const router = useRouter();
  const { genreId, name } = router.query as { genreId?: string; name?: string };
  const [genre, setGenre] = useState<GenreData | null>(null);
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  useEffect(() => {
    if (page < 1) setPage(1);
    const fetchData = async () => {
      if (!genreId) return;
      const data = await getGenreId(genreId, page);
      setGenre(data);
    };

    fetchData();
  }, [genreId, page, setPage]);

  return (
    <div>
      <h1 className="flex mt-15 ml-30 text-2xl font-bold">Search filter:</h1>
      <h1 className="ml-12 mt-10 text-xl font-bold">Genres</h1>
      <div className="w-full flex mt-10 gap-8 ml-10">
        <Genres className="mt-25" />
        <div className="border-1 max-h-full mx-auto "></div>
        <div className="max-w-6xl w-full flex flex-col gap-6 mr-10">
          <h1 className="font-bold text-2xl">
            {genre ? genre.total_results : 0} titles in "{name ?? ""}"
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-auto">
            {genre?.results?.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                vote_average={movie.vote_average}
                poster_path={movie.poster_path}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20">
        <Pagination className="gap-2">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => {
                  if (page > 1) setPage(page - 1);
                }}
              />
            </PaginationItem>

            {Array.from({ length: 4 }, (_, i) => {
              const pageNum = page - 1 + i;
              if (!genre || pageNum < 1 || pageNum > genre.total_pages)
                return null;
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink href="#" onClick={() => setPage(pageNum)}>
                    <Button
                      className={
                        pageNum === page
                          ? "bg-gray-400 text-black dark:text-white"
                          : "bg-gray-200 text-black dark:text-white"
                      }
                      variant={pageNum === page ? "default" : "outline"}
                    >
                      {pageNum}
                    </Button>
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => {
                  if (genre && page + 1 <= genre.total_pages) setPage(page + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
