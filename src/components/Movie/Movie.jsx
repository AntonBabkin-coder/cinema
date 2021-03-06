import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import './Movie.css';
import icon from './inf.jpeg';
import { RateStars } from '../RateStars/RateStars';
import { Genre } from '../Genre/Genre';
import { changeColors } from '../Helper/ChangeColors';
import { AppContext } from '../Context/Context';

export const Movie = ({ img, title, date, description, rating, genreIds, getRatedMovie, ratedId, ids }) => (
  <AppContext.Consumer>
    {(genres) => {
      const movieGenre = [...genreIds];
      const element = genres.map(({ id, name }) => (movieGenre.includes(id) ? <Genre name={name} key={id} /> : null));
      const setValue = ratedId[ids] ? ratedId[ids] : 0;

      let newDate;
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
          <img src={img ? process.env.REACT_APP_PICTURE + img : icon} alt="film" />
          <div className="movie__description">
            <div className="movie__title-block">
              <h2>{title}</h2>
              <div className="movie__rating" style={{ borderColor: changeColors(rating) }}>
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
    }}
  </AppContext.Consumer>
);

Movie.defaultProps = {
  img: '',
  title: '',
  date: '',
  description: '',
  rating: '',
  genreIds: [],
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
  genreIds: PropTypes.arrayOf(PropTypes.number),
  getRatedMovie: PropTypes.func,
  ratedId: PropTypes.objectOf(PropTypes.number),
  ids: PropTypes.number,
};
