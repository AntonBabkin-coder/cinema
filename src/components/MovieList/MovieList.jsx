import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';
import { Movie } from '../Movie/Movie';
import './movieList.css';
import { Spiner } from '../Spiner/Spiner';
// import { AppContext } from '../../App';

export const MovieList = ({ loading, error, movies, getRatedMovie }) => {
  const moviesElement = movies.map((item) => (
    <Movie
      key={item.id}
      img={item.poster_path}
      title={item.original_title}
      date={item.release_date}
      description={item.overview}
      rating={item.vote_average}
      dateFormat="PPP"
      genreIds={item.genre_ids}
      getRatedMovie={(value) => getRatedMovie(item.id, value)}
    />
  ));

  return (
    <div className="movie__card-wrapper">
      {moviesElement}
      {moviesElement.length === 0 && loading && (
        <Alert
          message="No films"
          description="Unfortunately, there are no movies for your request"
          type="warning"
          showIcon
          closable
        />
      )}
      {error && <Alert message="Error" description="Сheck your internet connection" type="error" showIcon closable />}
      {!loading && !error && <Spiner />}
    </div>
  );
};
MovieList.defaultProps = {
  movies: {},
  loading: false,
  error: false,
  // genres: [],
  getRatedMovie: () => {},
};

MovieList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  movies: PropTypes.arrayOf(
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
  // genres: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     id: PropTypes.number,
  //     name: PropTypes.string,
  //   })
  // ),
  getRatedMovie: PropTypes.func,
};
