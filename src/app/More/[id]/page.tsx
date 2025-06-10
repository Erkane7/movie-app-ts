"use client";
import { use, useEffect, useState } from "react";
import {
  parseAsInteger,
  useQueryState,
} from "nuqs";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/ui/pagination";
import { getMoreMovies } from "@/services/getMoreMovies";
import { MovieCard } from "@/Components/MovieCard";
import { Button } from "@/Components/ui/button";
import type { Movie, MovieResponse } from "@/types";

export default function Page({ params }: { params: { id: number} }) {
  const {id} = use(params);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  useEffect(() => {
    const fetchData = async () => {
      if (!id || typeof id !== "string") return;

      try {
        const data: MovieResponse = await getMoreMovies(id, page);
        setMovies(data?.results || []);
        setTotalPages(data?.total_pages || 1);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchData();
  }, [id, page]);

  return (
    <div className="flex justify-center w-full px-4 mt-12">
      <div className="flex flex-col w-full gap-6 max-w-7xl">
        <h1 className="text-xl font-bold">More like this</h1>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movies.slice(0, 10).map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              vote_average={movie.vote_average}
              poster_path={movie.poster_path}
            />
          ))}
        </div>

        <div className="mt-4">
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
                if (pageNum < 1 || pageNum > totalPages) return null;
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink href="#" onClick={() => setPage(pageNum)}>
                      <Button
                        className={
                          pageNum === page
                            ? "bg-gray-300 text-black"
                            : "bg-white text-black"
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
                    if (page + 1 <= totalPages) setPage(page + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
