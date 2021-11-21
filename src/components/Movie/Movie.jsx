import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import './movie.css';
import icon from './inf.jpeg';
import RateStars from '../Rate/Rate';
import Genre from '../Genre/Genre';

const Movie = ({ img, title, date, description, rating, genre, genreArr, getRatedMovie, ratedId, ids }) => {
  const movieGenre = [...genre];

  const element = genreArr.map(({ id, name }) => (movieGenre.includes(id) ? <Genre name={name} key={id} /> : null));
  const setValue = ratedId[ids] ? ratedId[ids] : 0;
  let colorRating = '';

  if (rating < 3) {
    colorRating = '#E90000';
  }
  if (rating >= 3 && rating < 5) {
    colorRating = '#E97E00';
  }
  if (rating >= 5 && rating < 7) {
    colorRating = '#E9D100';
  }
  if (rating >= 7) {
    colorRating = '#66E900';
  }

  const picture = 'https://image.tmdb.org/t/p/w500';
  const moviePicture = picture + img;

  let newDate;
  if (date !== '') {
    newDate = format(new Date(date), 'PPP');
  }

  let text = description;
  if (text.length > 150) {
    const etc = '...';
    text = text.slice(0, 150) + etc;
  }
  const style = { borderColor: colorRating };
  return (
    <div className="movie__card">
      <img src={img ? moviePicture : icon} alt="film" />
      <div className="movie__description">
        <div className="movie__title-block">
          <h2>{title}</h2>
          <div className="movie__rating" style={style}>
            {rating}
          </div>
        </div>
        <span className="date">{!newDate ? 'No release date' : newDate}</span>
        <div className="movie__genre">{element}</div>
        <p>{text}</p>
        <RateStars getRatedMovie={(value) => getRatedMovie(value)} ratedId={ratedId} setValue={setValue} />
      </div>
    </div>
  );
};

Movie.defaultProps = {
  img: '',
  title: '',
  date: '',
  description: '',
  rating: '',
  genre: [],
  genreArr: [],
  getRatedMovie: () => {},
  ratedId: {},
  ids: 0,
};

Movie.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  rating: PropTypes.number,
  genre: PropTypes.arrayOf(PropTypes.number),
  genreArr: PropTypes.arrayOf(PropTypes.object),
  getRatedMovie: PropTypes.func,

  ratedId: PropTypes.objectOf(PropTypes.number),
  ids: PropTypes.number,
};

export default Movie;
