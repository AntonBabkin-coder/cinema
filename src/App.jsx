import React, { Component } from 'react';
import './App.css';
import debounce from 'lodash.debounce';
import MovieService from './servises/Api';
import MovieList from './components/MovieList/MovieList';
import Search from './components/Search/Search';
import Pagination from './components/Pagination/Pagination';

export default class App extends Component {
  movieService = new MovieService();

  state = {
    movie: [],
    loading: false,
    error: false,
    currentPage: 1,
    textValue: '',
  };

  componentDidMount() {
    this.updateMovies();
  }

  setValue = debounce((text) => {
    this.setState({
      textValue: text.target.value,
      currentPage: 1,
    });
    const { currentPage } = this.state;

    this.movieService
      .getMovie(text.target.value, currentPage)
      .then((film) => {
        this.setState({
          movie: [...film],
          loading: true,
        });
      })
      .catch(this.onError);
  }, 500);

  paginate = (pageNumber) => {
    const { textValue } = this.state;

    this.setState({
      currentPage: pageNumber,
    });
    this.movieService
      .getMovie(textValue, pageNumber)
      .then((film) => {
        this.setState({
          movie: [...film],
          loading: true,
        });
      })
      .catch(this.onError);
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  updateMovies() {
    const { currentPage } = this.state;
    this.movieService
      .getMovie('return', currentPage)
      .then((film) => {
        this.setState({
          movie: [...film],
          loading: true,
        });
      })
      .catch(this.onError);
  }

  render() {
    const { movie, loading, error, currentPage } = this.state;

    return (
      <section className="app">
        <div className="app__wrapper">
          <Search search={this.setValue} />
          <MovieList movie={movie} loading={loading} error={error} />
          <Pagination paginate={this.paginate} currentPage={currentPage} />
        </div>
      </section>
    );
  }
}
