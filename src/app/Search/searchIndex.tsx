import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MovieCard } from "@/components/MovieCard";
import { parseAsInteger, useQueryState } from "nuqs";
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
import { getSearchId } from "@/services/getSearchId";

export default function CategorMorePage() {
  const router = useRouter();
  const { genreId, name } = router.query;
  const [genre, setGenre] = useState({});
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  useEffect(() => {
    if (page < 1) setPage(1);
    const fetchData = async () => {
      if (!genreId) return;
      const data = await getSearchId(genreId, page);
      setGenre(data);
    };

    fetchData();
  }, [genreId, page]);

  return (
    <div>
      <h1 className="flex text-2xl font-bold mt-15 ml-30">Search filter:</h1>
      <div className="flex w-full mt-12">
        <div className="flex flex-col w-full max-w-6xl gap-6 mt-10">
          <h1 className="text-2xl font-bold">
            {genre?.total_results} titles in "{name}"
          </h1>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-auto">
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
        <GenreNames />
      </div>
      <div className="mt-4">
        <Pagination>
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
              if (pageNum < 1 || pageNum > genre?.total_pages) return null;
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
                  if (page + 1 < genre?.total_pages) setPage(page + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
