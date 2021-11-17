import React, { Component } from 'react';
import './App.css';
import debounce from 'lodash.debounce';
import { Tabs } from 'antd';
import MovieService from './servises/Api';
import MovieList from './components/MovieList/MovieList';
import Rated from './components/Rated/Rated';
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
    genreArr: [],
    idSession: '',
    ratedMovies: [],
  };

  componentDidMount() {
    this.getSession();
    this.updateMovies();
    this.getUpGenres();
  }

  getSession() {
    this.movieService.newQuestSession().then((idSession) => {
      console.log(idSession);

      this.setState({
        idSession,
      });
    });
  }

  getUpGenres() {
    this.movieService.getGenres().then((genres) => {
      this.setState({
        genreArr: [...genres],
      });
    });
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

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  getIdSessionMovies() {
    const { idSession } = this.state;
    this.movieService.getRated(idSession).then((movies) => {
      this.setState({
        ratedMovies: [...movies.results],
      });
      // this.movieService.getRatedMovie();
    });
  }

  getRatedMovie(id, value) {
    const { idSession } = this.state;
    this.movieService.postRated(id, value, idSession).then((res) => console.log(res));
  }

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
    const { TabPane } = Tabs;
    const { movie, loading, error, currentPage, genreArr, ratedMovies } = this.state;

    return (
      <section className="app">
        <div className="app__wrapper">
          <Tabs defaultActiveKey="1" centered onChange={() => this.getIdSessionMovies()}>
            <TabPane tab="Tab 1" key="1">
              <Search search={this.setValue} />
              <MovieList
                movie={movie}
                loading={loading}
                error={error}
                genreArr={genreArr}
                getRatedMovie={(id, value) => this.getRatedMovie(id, value)}
              />
              <div className="pagination">
                <Pagination paginate={this.paginate} currentPage={currentPage} loading={loading} />
              </div>
            </TabPane>
            <TabPane tab="Tab 2" key="2">
              <Rated ratedMovies={ratedMovies} />
            </TabPane>
          </Tabs>
        </div>
      </section>
    );
  }
}
