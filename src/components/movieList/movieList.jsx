import React from 'react';
import PropTypes from 'prop-types';
import Movie from '../Movie/Movie';
import './movieList.css';
import Spiner from '../Spiner/Spiner';
import Alert from '../Alert/Alert';

const MovieList = ({ movie, loading, error }) => {
  const element = movie.map((item) => (
    <Movie
      key={item.id}
      img={item.backdrop_path}
      title={item.original_title}
      date={item.release_date}
      description={item.overview}
      rating={item.vote_average}
      dateFormat="PPP"
    />
  ));

  if (!loading && !error) {
    return <Spiner />;
  }

  if (error) {
    return <Alert />;
  }

  return <div className="movie__card-wrapper">{element}</div>;
};
MovieList.defaultProps = {
  movie: {},
  loading: true,
  error: false,
};

MovieList.propTypes = {
  movie: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.bool,
};

export default MovieList;
