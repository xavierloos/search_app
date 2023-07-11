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
import { red } from "@mui/material/colors";
import Text from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faChevronCircleDown,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { getFavorites } from "./utils";

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

export default function Movie({ movie, isOnFavorites, from }) {
  const [expanded, setExpanded] = React.useState(false);
  const [added, setAdded] = React.useState(isOnFavorites);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const addToFav = (movie) => {
    if (!added) {
      const destructuredData = {
        id: movie.id,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
        original_title: movie.original_title,
        backdrop_path: movie.backdrop_path,
        overview: movie.overview,
      };
      const favs = getFavorites();
      favs.push(destructuredData);
      localStorage.setItem("FavMovies", JSON.stringify(favs));
      setAdded(true);
    }
  };

  let rate = Math.round(movie.vote_average * 10) / 10;

  let bg = null;

  if (rate <= 4) {
    bg = `red`;
  } else if (rate >= 5 && rate <= 7) {
    bg = `orange`;
  } else {
    bg = `green`;
  }

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
            {movie.original_title}
          </span>
        }
        subheader={`${movie.release_date}`}
      />
      <CardMedia
        component="img"
        height="194"
        image={
          movie.backdrop_path != null
            ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
            : `https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fih1.redbubble.net%2Fimage.195569260.8857%2Fflat%2C550x550%2C075%2Cf.u2.jpg&f=1&nofb=1&ipt=cf0f5cd8b535f93e869cba4166314b181e8ccf8181136ae3c92ec791e785b234&ipo=images`
        }
        alt={`movie-${movie.id}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" className="summary">
          {movie.overview}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          disabled={added}
          className={`${from == "favorites" ? "d-none" : ""}`}
        >
          <FontAwesomeIcon
            icon={added ? faCheck : faHeart}
            onClick={() => (added ? null : addToFav(movie))}
          />
        </IconButton>

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
