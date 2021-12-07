import React, { Component } from 'react';
import './App.css';
import debounce from 'lodash.debounce';
import { Tabs } from 'antd';
import MovieService from './servises/Api';
import MovieList from './components/MovieList/MovieList';
import RatedFilms from './components/RatedFilms/RatedFilms';
import Search from './components/Search/Search';
import Pagination from './components/Pagination/Pagination';

export default class App extends Component {
  movieService = new MovieService();

  state = {
    movies: [],
    loading: false,
    error: false,
    currentPage: 1,
    textValue: '',
    genres: [],
    idSession: '',
    ratedMovies: [],
    ratedId: {},
    totalPages: 800,
    visiblePaginate: true,
    popular: true,
  };

  componentDidMount() {
    this.getSession();
    this.getUpGenres();
    this.popularMovie('1');
  }

  getSession() {
    this.movieService.newQuestSession().then((idSession) => {
      this.setState({
        idSession,
      });
    });
  }

  getUpGenres() {
    this.movieService.getGenres().then((genresArr) => {
      this.setState({
        genres: [...genresArr],
      });
    });
  }

  setValue = debounce((text) => {
    const { currentPage } = this.state;
    if (text.target.value === '') {
      this.setState({
        popular: true,
        totalPages: 800,
        currentPage: 1,
      });
      this.popularMovie('1');
    } else {
      this.movieService
        .getMovie(text.target.value, currentPage)
        .then((film) => {
          this.setState({
            movies: [...film],
            loading: true,
            textValue: text.target.value,
            currentPage: 1,
            popular: false,
          });
        })
        .catch(this.onError);
      this.movieService.getPages(text.target.value, currentPage).then((obj) => {
        if (obj.total_pages <= 1) {
          this.setState({
            visiblePaginate: false,
          });
        }
        if (obj.total_pages > 1) {
          this.setState({
            visiblePaginate: true,
          });
        }
        this.setState({
          totalPages: obj.total_pages * 10,
        });
      });
    }
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
    });
  }

  getRatedMovie(id, value) {
    const { idSession } = this.state;
    this.movieService.postRated(id, value, idSession).then(() =>
      this.setState(({ ratedId }) => {
        const rateObj = { ...ratedId, [id]: value };
        return { ratedId: rateObj };
      })
    );
  }

  paginate = (pageNumber) => {
    const { textValue, popular } = this.state;
    this.setState({
      currentPage: pageNumber,
    });
    if (popular) {
      this.popularMovie(pageNumber);
    } else {
      this.searchMovies(textValue, pageNumber);
    }
  };

  popularMovie(page) {
    this.movieService
      .getPopular(page)
      .then((film) => {
        this.setState({
          movies: [...film],
          loading: true,
        });
      })
      .catch(this.onError);
  }

  searchMovies(text, page) {
    this.movieService
      .getMovie(text, page)
      .then((film) => {
        this.setState({
          movies: [...film],
          loading: true,
        });
      })
      .catch(this.onError);
  }

  render() {
    const { TabPane } = Tabs;
    const { movies, loading, error, currentPage, genres, ratedMovies, ratedId, totalPages, visiblePaginate } =
      this.state;
    return (
      <section className="app">
        <div className="app__wrapper">
          <Tabs defaultActiveKey="1" centered onChange={() => this.getIdSessionMovies()}>
            <TabPane tab="Tab 1" key="1">
              <Search search={this.setValue} />
              <MovieList
                movies={movies}
                loading={loading}
                error={error}
                genres={genres}
                getRatedMovie={(id, value) => this.getRatedMovie(id, value)}
              />
              <div className="pagination">
                {visiblePaginate && (
                  <Pagination
                    paginate={this.paginate}
                    currentPage={currentPage}
                    loading={loading}
                    totalPages={totalPages}
                  />
                )}
              </div>
            </TabPane>
            <TabPane tab="Tab 2" key="2">
              <RatedFilms
                ratedMovies={ratedMovies}
                genres={genres}
                getRatedMovie={(id, value) => this.getRatedMovie(id, value)}
                ratedId={ratedId}
              />
            </TabPane>
          </Tabs>
        </div>
      </section>
    );
  }
}
