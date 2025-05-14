import { useSelector } from "react-redux"
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {

    const  { movieNames, movieResults} = useSelector((store) =>store.gpt);

    if(!movieNames) return null;


  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-90">
    <div>
        {/* <h1>
            {movieNames[0]}
        </h1> */}
        {
            movieNames.map((i,idx) =>(movieResults[idx].length && <MovieList key={i} title={i} movies={movieResults[idx]}/>))
        }
        
    </div>
    </div>
  )
};

export default GptMovieSuggestions;