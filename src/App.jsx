import React, { Component } from 'react';
import './App.css';

import MovieService from './servises/api';
import MovieList from './components/movieList/movieList';
import Search from './components/search/search';

export default class App extends Component {
  movieService = new MovieService();

  state = {
    movie: [],
    loading: false,
    error: false,
  };

  componentDidMount() {
    this.updateMovies();
  }

  setValue = (text) => {
    this.movieService.getMovie(text.target.value).then((film) => {
      this.setState({
        movie: [...film],
      });
    });
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  updateMovies() {
    this.movieService
      .getMovie('return')
      .then((film) => {
        this.setState({
          movie: [...film],
          loading: true,
        });
      })
      .catch(this.onError);
  }

  render() {
    const { movie, loading, error } = this.state;

    return (
      <section className="app">
        <div className="app__wrapper">
          <Search search={this.setValue} />
          <MovieList movie={movie} loading={loading} error={error} />
        </div>
      </section>
    );
  }
}
