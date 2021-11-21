import React from 'react';
import PropTypes from 'prop-types';
import Movie from '../Movie/Movie';
import './movieList.css';
import Spiner from '../Spiner/Spiner';
import Alert from '../Alert/Alert';
import NoMovie from '../Alert/NoMovie';

const MovieList = ({ loading, error, movie, genreArr, getRatedMovie }) => {
  const element = movie.map((item) => (
    <Movie
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
    />
  ));

  const spiner = !loading && !error ? <Spiner /> : null;
  const errorAlert = error ? <Alert /> : null;
  const noMovie = element.length === 0 && loading ? <NoMovie /> : null;

  return (
    <div className="movie__card-wrapper">
      {element}
      {noMovie}
      {errorAlert}
      {spiner}
    </div>
  );
};
MovieList.defaultProps = {
  movie: {},
  loading: false,
  error: false,
  genreArr: [],
  getRatedMovie: () => {},
};

MovieList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  movie: PropTypes.arrayOf(PropTypes.object),
  genreArr: PropTypes.arrayOf(PropTypes.object),
  getRatedMovie: PropTypes.func,
};

export default MovieList;
