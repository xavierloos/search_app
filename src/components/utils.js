//Add more functions here
export function getFavorites() {
  return JSON.parse(localStorage.getItem("FavMovies")) ?? [];
}
