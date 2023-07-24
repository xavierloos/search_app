//Add more functions here
import axios from "axios";
import request from "./Request";

export function getFavoriteMovies() {
  return JSON.parse(localStorage.getItem("FavMovies")) ?? [];
}

function destructureData(movie){
  return{
    id:movie.id,
    title:movie.original_title, 
    overview:movie.overview,
    poster:movie.poster_path,
    poster_2:movie.backdrop_path,
    release_date:movie.release_date,
    rating:movie.vote_average
    }
}

export async function getMovies(){
  let result = []
  await axios.get(request.movies).then((res) => {
    res.data.results.map(movie=>
      result.push(
        destructureData(movie)
      )
    )
  });
return result
}

export async function searchMovieByName(name){
  let result = []
  await axios.get(request.search + "&query=" + name).then((res) => {
    res.data.results.map(movie=>
      result.push(
        destructureData(movie)
      )
    )
  });
return result
}