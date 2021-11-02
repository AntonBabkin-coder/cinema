import React from 'react';
import PropTypes from 'prop-types';

import Movie from '../movie/movie';

import './movieList.css';

function MovieList({ movie }) {
  MovieList.defaultProps = {
    movie: {},
  };

  MovieList.propTypes = {
    movie: PropTypes.arrayOf(PropTypes.object),
  };

  const element = movie.map((item) => (
    // console.log(item.backdrop_path)
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

  return <div className="movie__card-wrapper">{element}</div>;
}

export default MovieList;
