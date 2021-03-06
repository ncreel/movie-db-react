import React, {useState} from "react";
import CardList from "./CardList.js"

export default function SearchMovies(){

  // states: input query, movies to display
  const [query, setQuery] = useState(''); // returns state, and
                                          //function to change state
  //create state for movies, and update that state appropriately
  const [movies, setMovies] = useState([])

  const searchMovies = async (event) => {
    event.preventDefault();
    console.log("submitting");

    //const query = "Jurassic Park"; // debug
    const url=`https://api.themoviedb.org/3/search/movie?api_key=a77003fdb339c52990623603a013c891&language=en-US&query=${query}&page1&include_adult=false`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      //console.log(data); debug
      setMovies(data.results);
      //console.log(movies);
    }catch(err){
      console.log(err)
    }
  }
  // target is input, value is the value of the input
  // get around react's parent tag restrictionm with empty tags
  // the filter method only shows movies with poster paths
  return(
    <>
    <form className="form" onSubmit={searchMovies}>
      <label className="label" htmlFor="query">Movie Name</label>
      <input className="query" type="text" name="query"
      placeholder="i.e. Gone with the Wind"
      value={query} onChange={(event) => setQuery(event.target.value)}/>
      <button className="button" type="submit">Search</button>
    </form>
    <div className="card-list">
    {movies.filter(movie => movie.poster_path).map(movie => (
        <CardList data={movie}/>
    ))};
    </div>
    </>
  )
}
