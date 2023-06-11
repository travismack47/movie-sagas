import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const movieDetails = useSelector(state => state.movieDetails);

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIE_DETAILS', payload: { id } });
  }, [dispatch, id]);

  return (
    <>
    <main>
      <h1>Movie Details</h1>
      <section>
        <h2>Title: {movieDetails.title}</h2>
        <img src={movieDetails.poster} alt={movieDetails.title} />
        <p>Description: {movieDetails.description}</p>
        <p>Genre: {movieDetails.genres}</p>
      </section>
    </main>
    </>
  );
}

export default Details;