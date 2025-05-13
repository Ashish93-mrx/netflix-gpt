import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();

  return (
    <div>
      <Header />
      {/* 
      maincontainer
      -videoBackground
      -videotitle
      secondaryContainer
      -movieList * n
      -cards * n
       */}
       <MainContainer/>
       <SecondaryContainer/>

    </div>
  );
};

export default Browse;
