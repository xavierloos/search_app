import React, { useEffect, useState, useMemo, useRef } from "react";
import request from "./Request";
import axios from "axios";
import FlatList from "flatlist-react";
import Movie from "./Movie";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "react-bootstrap/Badge";
import { getFavoriteMovies, getMovies,searchMovieByName } from "./utils";

export default function Search() {
  const [movies, setMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState();
  const [favorites, setFavorites] = useState(getFavoriteMovies());
  const latestSearch = useRef(new Array());
  const favs = useMemo(() => getFavoriteMovies(), [favorites]);

  useEffect(() => {
    getMovies().then((res)=>setMovies(res)) 
  }, []);

  const renderMovie = (movie, from) => {
    let isOnFavorites = favorites.find((o) => o.id === movie.id) ? true : false;
    return (
      <div
        key={movie.id}
        className="col-12 col-sm-6 col-md-6 col-lg-4 px-2 py-2"
      >
        <Movie movie={movie} defaultFavoriteValue={isOnFavorites} from={from} />
      </div>
    );
  };

  const handleSubmitSearch = (event) => {
    event.preventDefault();
    searchMovieByName(searchMovie).then(res=>{
      setMovies(res)
      latestSearch.current.push(searchMovie)
      setSearchMovie("")
    })
  };

  return (
    <>
      <div className="row d-flex items-center justify-content-between p-4 z-[100] absolute border-2 ">
        <div className="col-12">
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
            onSubmit={handleSubmitSearch}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Movie"
              inputProps={{ "aria-label": "Search Movie" }}
              value={searchMovie}
              onChange={(e) => setSearchMovie(e.target.value)}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
              disabled={!searchMovie}
              onClick={handleSubmitSearch}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
      </div>
      {latestSearch.current.length > 0 ? (
        <div className="row d-flex flex-column items-center justify-content-around p-4 z-[100] absolute border-2 ">
          <div className="col-12">
            <h4>Latest search</h4>
            {latestSearch.current.map((element, index) => (
              <Badge key={index} bg="secondary">
                {element}
              </Badge>
            ))}
          </div>
        </div>
      ) : null}
      <div className="row d-flex flex-column items-center justify-content-around p-4 z-[100] absolute border-2 ">
        <div className="col-12">
          <Tabs>
            <TabList>
              <Tab>
                <h2>Movies</h2>
              </Tab>
              <Tab onClick={()=>setFavorites(getFavoriteMovies())}>
                <h2>Favorites</h2>
              </Tab>
            </TabList>

            <TabPanel>
              <div className="col-12 d-flex flex-row flex-wrap">
                <FlatList
                  list={movies}
                  renderItem={(movie) => renderMovie(movie, "movies")}
                  renderWhenEmpty={() => (
                    <div>I'm sorry, we couldn't find that title!</div>
                  )}
                />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="col-12 d-flex flex-row flex-wrap">
                <FlatList
                  list={favs}
                  renderItem={(movie) => renderMovie(movie, "favorites")}
                  renderWhenEmpty={() => <div>No favorites yet</div>}
                />
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </>
  );
}
