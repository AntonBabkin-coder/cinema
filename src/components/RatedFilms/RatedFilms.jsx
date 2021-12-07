import React from 'react';
import PropTypes from 'prop-types';
import Movie from '../Movie/Movie';

const RatedFilms = ({ ratedMovies, genres, getRatedMovie, ratedId }) => {
  const element = ratedMovies.map((item) => (
    <Movie
      ids={item.id}
      key={item.id}
      img={item.backdrop_path}
      title={item.original_title}
      date={item.release_date}
      description={item.overview}
      rating={item.vote_average}
      dateFormat="PPP"
      genre={item.genre_ids}
      genres={genres}
      getRatedMovie={(value) => getRatedMovie(item.id, value)}
      ratedId={ratedId}
    />
  ));
  return <div className="movie__card-wrapper">{element}</div>;
};

RatedFilms.defaultProps = {
  ratedMovies: [],
  genres: [],
  getRatedMovie: () => {},
  ratedId: {},
};

RatedFilms.propTypes = {
  ratedMovies: PropTypes.arrayOf(
    PropTypes.shape({
      adult: PropTypes.bool,
      backdrop_path: PropTypes.string,
      genre_ids: PropTypes.arrayOf,
      id: PropTypes.number,
      original_language: PropTypes.string,
      original_title: PropTypes.string,
      overview: PropTypes.string,
      popularity: PropTypes.number,
      poster_path: PropTypes.string,
      release_date: PropTypes.string,
      title: PropTypes.string,
      video: PropTypes.bool,
      vote_average: PropTypes.number,
      vote_count: PropTypes.number,
    })
  ),
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
  getRatedMovie: PropTypes.func,
  ratedId: PropTypes.objectOf(PropTypes.number),
};

export default RatedFilms;
