import { useRef } from "react";
import MovieCard from "./MovieCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const MovieList = ({ title, movies }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="px-6 pb-2">
      <h1 className="text-lg md:text-3xl py-4 text-white">{title}</h1>

      <div className="relative">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-2 rounded-full hidden md:block"
        >
          <FaChevronLeft size={20} />
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-scroll no-scrollbar scroll-smooth"
        >
          <div className="flex space-x-4">
            {movies?.map((movie) => (
              <MovieCard key={movie.id} posterPath={movie.poster_path} />
            ))}
          </div>
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-2 rounded-full hidden md:block"
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default MovieList;
