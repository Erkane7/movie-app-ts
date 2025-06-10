import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MovieCard } from "@/components/MovieCard";
import { Button } from "@/Components/ui/buttons";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getMoreMovies } from "@/services/getMoremovies";
import { parseAsInteger, useQueryState } from "nuqs";

export default function CategorMorePage() {
  const router = useRouter();
  const { id } = router.query;

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const data = await getMoreMovies(id, page);
      console.log(data);
      setMovies(data?.results);
    };

    fetchData();
  }, [id, page]);

  return (
    <div>
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
                  if (pageNum < 1 || pageNum > movies?.total_pages) return null;
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
                      if (page + 1 < movies?.total_pages) setPage(page + 1);
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
