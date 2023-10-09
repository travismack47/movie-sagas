import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

// MaterialUI styling
const useStyles = makeStyles(theme => ({
    heading: {
        fontStyle: 'italic',
        marginBottom: theme.spacing(2) // Adjust the spacing as needed
    },
}));

function MovieList() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies); // Grabbing movies from the store // 

    // Fetches movies upon render
    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        <>
        <main>
            <Typography variant='h2'>Movies Saga!</Typography>
            <Typography variant="h3" className={classes.heading}>
                List of Films
            </Typography>
            <Grid container spacing={2}>
                {movies.map(movie => (
                    <Grid item xs={12} sm={6} md={4} key={movie.id}>
                        <Typography variant="h4">{movie.title}</Typography>
                        <img
                            src={movie.poster}
                            alt={movie.title}
                            onClick={() => { // In-line function with dispatch to get movie details when image is clicked // 
                                dispatch({
                                    type: 'FETCH_MOVIE_DETAILS',
                                    payload: { id: movie.id },
                                });
                                history.push(`/api/movie/details/${movie.id}`); // Brings user to homepage when HOME button is clicked // 
                            }}
                        />
                    </Grid>
                ))}
            </Grid>
        </main>
        </>
    );
}

export default MovieList;
