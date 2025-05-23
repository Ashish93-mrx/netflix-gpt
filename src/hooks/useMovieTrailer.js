import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {addTrailerVideo} from "../utils/movieSlice"

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

//   const nowPlayingMovies = useSelector((store) => store.movies.nowPlayingMovies);


  const getMovieVideo = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      API_OPTIONS
    );
    const json = await data.json();

    const filterData = json.results.filter((i) => i.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : json.results[0];
    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
    // (!nowPlayingMovies) && 
    getMovieVideo();
  }, []);
};
export default useMovieTrailer;
