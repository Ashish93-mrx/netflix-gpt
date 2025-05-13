import languageConstants from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import openai from '../utils/openAi'
import {API_OPTIONS} from '../utils/constants'
import {addGptMovieResult} from '../utils/gptSlice'

const GptSearchBar = () => {
  const lang = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);
    const gptQuery = "Act as a Movie Recommendation system and suggest some movies for the query : " +searchText.current.value +". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    //make api call to gpt
    const gptResult = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [{ role: "user", content: gptQuery }],
    });

    // completion.then((result) => console.log(result.choices[0].message));
    console.log(gptResult.choices[0].message.content.split(","));
    const gptMovies = gptResult.choices[0].message.content.split(",");
    if(!gptResult) console.log("error");

    const promiseArray = gptMovies.map(movie => searchMovieTMDB(movie));

    const tmdbResults = await Promise.all(promiseArray);

    dispatch(addGptMovieResult({movieNames: gptMovies, movieResults:tmdbResults}));
    console.log(tmdbResults,"ui");
  };

  //search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch('https://api.themoviedb.org/3/search/movie?query='+movie+'&include_adult=false&language=en-US&page=1',API_OPTIONS);

    const json = await data.json();
    return json.results;


  }
  return (
    <div className="pt-[35%] flex justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="md:w-1/2 w-full bg-black grid grid-cols-12"
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 bg-white col-span-9"
          placeholder={languageConstants[lang].gptSearchPlaceHolder}
        />
        <button
          onClick={handleGptSearchClick}
          className="py-2 m-4 px-4 rounded-lg bg-red-400 text-white col-span-3"
        >
          {languageConstants[lang].search}
        </button>
      </form>
      <div>
        
      </div>
    </div>
  );
};

export default GptSearchBar;