import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Typography, Button, makeStyles } from '@material-ui/core';

// MaterialUI styling
const useStyles = makeStyles(theme => ({
  detailsContainer: {
    textAlign: 'center'
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  description: {
    marginBottom: theme.spacing(2),
  },
  homeButton: {
    fontSize: '1.5rem',
    marginTop: theme.spacing(25.5),
    padding: theme.spacing(2),
    borderRadius: '50%',
    textTransform: 'uppercase',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    '&:hover': {
      background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
    },
  },
}));
// End styling

function MovieDetails() {
    const classes = useStyles();
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();
    const movieDetails = useSelector(state => state.movieDetails);

  
    useEffect(() => {
      dispatch({ type: 'FETCH_MOVIE_DETAILS', payload: { id } });
    }, [dispatch, id]);
  
    // Click handler to bring user to homepage from details page
    const handleClick = () => {
      history.push('/');
    };
  
    return (
        <>
      <main>
        <div className={classes.detailsContainer}>
          <Typography variant="h1" className={classes.title}>
            Movie Details
          </Typography>
          <section> 
            <Typography variant="h2">Title: {movieDetails.title}</Typography> 
            <img src={movieDetails.poster} alt={movieDetails.title} />
            <Typography variant="body1" className={classes.description}>
              Description: {movieDetails.description}
            </Typography>
            <Typography variant="body1">Genre: {movieDetails.genres}</Typography>
          </section>
        </div>
        <Button
          variant="contained"
          color="primary"
          className={classes.homeButton}
          onClick={handleClick}
        >
          Home
        </Button>
      </main>
      </>
    );
  }

  export default MovieDetails;