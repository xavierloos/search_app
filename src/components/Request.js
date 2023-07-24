const key = "5a87c210cb4199afca40930c06860d6b";

const request = {
  movies: `https://api.themoviedb.org/3/discover/movie?api_key=${key}`,
  search: `https://api.themoviedb.org/3/search/movie?api_key=${key}`,
  byId: `https://api.themoviedb.org/3/movie/`,
  key: `?api_key=${key}`,
};
export default request;

// https://api.themoviedb.org/3/discover/movie?api_key=?query=fast
