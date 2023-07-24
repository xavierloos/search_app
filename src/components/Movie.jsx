import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faChevronCircleDown,
  faCheck,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { getFavoriteMovies } from "./utils";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const defaultImg = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fih1.redbubble.net%2Fimage.195569260.8857%2Fflat%2C550x550%2C075%2Cf.u2.jpg&f=1&nofb=1&ipt=cf0f5cd8b535f93e869cba4166314b181e8ccf8181136ae3c92ec791e785b234&ipo=images'
export default function Movie({ movie, defaultFavoriteValue, from }) {
  console.log(defaultFavoriteValue);
  const [expanded, setExpanded] = React.useState(false);
  const [isAddedToFavorites, setIsAddedToFavorites] = React.useState(defaultFavoriteValue);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const addToFavorites = (movie) => {
    if (!isAddedToFavorites) {
      const favs = getFavoriteMovies();
      favs.push(movie);
      localStorage.setItem("FavMovies", JSON.stringify(favs));
      setIsAddedToFavorites(true);
      return
    }
  }

  const deleteMovieFromFavorites=(id)=>{
    const favs = getFavoriteMovies()
    let idx
    for (let index = 0; index < favs.length; index++) {
      if(favs[index]['id']===id){
        idx=index
      }
    }
    favs.splice(idx, 1);
    localStorage.setItem("FavMovies", JSON.stringify(favs));
    setIsAddedToFavorites(false);
  }

  let rate = Math.round(movie.rating * 10) / 10;

  let bg = null;

  if (rate <= 4) {
    bg = `red`;
  } else if (rate >= 5 && rate <= 7) {
    bg = `orange`;
  } else {
    bg = `green`;
  }

  let image_url = 'https://image.tmdb.org/t/p/original/'

  let movie_poster = movie.poster_2 != null ? image_url + movie.poster_2 : movie.poster != null ? image_url + movie.poster : defaultImg

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar style={{ background: bg }}>
            {rate} <br />
          </Avatar>
        }
        title={
          <span className="text-truncate text-break" style={{ width: "10px" }}>
            {movie.title}
          </span>
        }
        subheader={`${movie.release_date}`}
      />
      <CardMedia
        component="img"
        height="194"
        image={movie_poster}
        alt={`movie-${movie.id}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" className="summary">
          {movie.overview}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {isAddedToFavorites ?
          <IconButton
            aria-label="Remove from favorites"
          >
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() =>  deleteMovieFromFavorites(movie.id)}
            />
          </IconButton> :
          <IconButton
            aria-label="add to favorites" 
          >
            <FontAwesomeIcon
              icon={faHeart}
              onClick={() => (isAddedToFavorites ? null : addToFavorites(movie))}
            />
          </IconButton>
        }
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <FontAwesomeIcon icon={faChevronCircleDown} />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {movie.overview}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
