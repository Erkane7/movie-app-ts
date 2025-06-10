"use client";
import React from "react";
import MyCarouselItem from "./MovieCarouselItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface Movie {
  id: number;
  title: string;
  vote_average: number;
  backdrop_path: string;
  overview: string;
}

interface MovieCarouselProps {
  nowPlayingMovie: Movie[];
}

export const MovieCarousel: React.FC<MovieCarouselProps> = ({
  nowPlayingMovie,
}) => {
  return (
    <div>
      <Carousel
        className="relative mt-4 overflow-hidden rounded-lg max-w-screen"
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent>
          {nowPlayingMovie?.slice(0, 7).map((movie) => (
            <CarouselItem className="basis-full" key={movie.id}>
              <div className="mx-auto max-w-[1600px]">
                <MyCarouselItem
                  id={movie.id}
                  title={movie.title}
                  vote_average={movie.vote_average}
                  backdrop_path={movie.backdrop_path}
                  overview={movie.overview}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute invisible lg:visible left-5" />
        <CarouselNext className="absolute invisible lg:visible right-5" />
      </Carousel>
    </div>
  );
};
