import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import './movie.css';

function Movie({ img, title, date, description, rating }) {
  Movie.defaultProps = {
    img: '',
    title: '',
    date: '',
    description: '',
    rating: '',
  };

  Movie.propTypes = {
    img: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    rating: PropTypes.string,
  };

  let newDate;

  const picture = 'https://image.tmdb.org/t/p/w500';

  if (date !== '') {
    newDate = format(new Date(date), 'PPP');
  }

  let text = description;
  if (text.length > 150) {
    const etc = '...';
    text = text.slice(0, 150) + etc;
  }

  return (
    <div className="movie__card">
      <img src={picture + img} alt="film" />
      <div className="movie__description">
        <div className="movie__title-block">
          <h2>{title}</h2>
          <div className="movie__rating">{rating}</div>
        </div>
        <span className="date">{!newDate ? 'No date' : newDate}</span>
        <div className="movie__genre">
          <span>Action</span>
          <span>Drama</span>
        </div>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Movie;
