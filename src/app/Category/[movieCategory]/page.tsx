"use client";
import { getCategory } from "@/services/getCategory";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { parseAsInteger, useQueryState } from "nuqs";
import { Movie } from "@/types";
import { MovieCard } from "@/Components/MovieCard";
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

interface CategoryResponse {
  results: Movie[];
  total_pages: number;
}

export default function CategoryPage() {
  const [categoryData, setCategoryData] = useState<CategoryResponse>({
    results: [],
    total_pages: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  let { movieCategory } = router.query;

  if (Array.isArray(movieCategory)) {
    movieCategory = movieCategory[0];
  }

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  useEffect(() => {
    const fetchCategory = async () => {
      if (!movieCategory) return;
      setLoading(true);
      setError(null);
      try {
        const data = await getCategory(movieCategory, page);
        setCategoryData(data);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [movieCategory, page]);

  return (
    <div>
      <div className="flex justify-center w-full px-4 mt-12">
        <div className="flex flex-col w-full gap-6 max-w-7xl">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">
              {(movieCategory === "upcoming" && "Upcoming") ||
                (movieCategory === "popular" && "Popular") ||
                (movieCategory === "top_rated" && "Top rated")}
            </h1>
          </div>

          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {categoryData.results.map((movie) => (
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
                    onClick={(e) => {
                      e.preventDefault();
                      if (page > 1) setPage(page - 1);
                    }}
                  />
                </PaginationItem>

                {Array.from({ length: 4 }, (_, i) => {
                  const pageNum = page - 1 + i;
                  if (pageNum < 1 || pageNum > categoryData.total_pages)
                    return null;
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(pageNum);
                        }}
                      >
                        <Button
                          className={
                            pageNum === page
                              ? "bg-gray-300 text-black border-none"
                              : "bg-white text-black border-none"
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
                    onClick={(e) => {
                      e.preventDefault();
                      if (page + 1 <= categoryData.total_pages)
                        setPage(page + 1);
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
}
