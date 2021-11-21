import React from 'react';
import PropTypes from 'prop-types';
import Movie from '../Movie/Movie';

const Rate = ({ ratedMovies, genreArr, getRatedMovie, ratedId }) => {
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
      genreArr={genreArr}
      getRatedMovie={(value) => getRatedMovie(item.id, value)}
      ratedId={ratedId}
    />
  ));
  return <div className="movie__card-wrapper">{element}</div>;
};

Rate.defaultProps = {
  ratedMovies: [],
  genreArr: [],
  getRatedMovie: () => {},
  ratedId: {},
};

Rate.propTypes = {
  ratedMovies: PropTypes.arrayOf(PropTypes.any),
  genreArr: PropTypes.arrayOf(PropTypes.object),
  getRatedMovie: PropTypes.func,
  ratedId: PropTypes.objectOf(PropTypes.number),
};

export default Rate;
