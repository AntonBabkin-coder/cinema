import React, { Component } from 'react';
import './App.css';
import debounce from 'lodash.debounce';
import { Tabs } from 'antd';
import { MovieService } from './servises/Api';
import { MovieList } from './components/MovieList/MovieList';
import { RatedFilms } from './components/RatedFilms/RatedFilms';
import { Search } from './components/Search/Search';
import { PaginationPage } from './components/Pagination/Pagination';
import { AppContext } from './components/Context/Context';

// require('dotenv').config();

export class App extends Component {
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
    this.getPopularMovie('1');
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
      this.getPopularMovie('1');
    } else {
      this.movieService
        .getMovies(text.target.value, currentPage)
        .then((film) => {
          this.setState({
            movies: [...film.results],
            loading: true,
            textValue: text.target.value,
            currentPage: 1,
            popular: false,
            totalPages: film.total_pages * 10,
          });

          if (film.total_pages <= 1) {
            this.setState({
              visiblePaginate: false,
            });
          }
          if (film.total_pages > 1) {
            this.setState({
              visiblePaginate: true,
            });
          }
        })
        .catch(this.onError);
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
    this.setState({
      ratedMovies: [],
    });
    this.movieService
      .getRated(idSession)
      .then((movies) => {
        this.setState({
          ratedMovies: [...movies.results],
        });
      })
      .catch(this.onError);
  }

  getRatedMovie(id, value) {
    const { idSession } = this.state;
    this.movieService.ratedRequest(id, value, idSession).then(() =>
      this.setState(({ ratedId }) => {
        const rateObj = { ...ratedId, [id]: value };
        return { ratedId: rateObj };
      })
    );
  }

  getPopularMovie(page) {
    this.movieService
      .getPopularRequest(page)
      .then((film) => {
        this.setState({
          movies: [...film],
          loading: true,
        });
      })
      .catch(this.onError);
  }

  paginate = (pageNumber) => {
    const { textValue, popular } = this.state;
    this.setState({
      currentPage: pageNumber,
    });
    if (popular) {
      this.getPopularMovie(pageNumber);
    } else {
      this.searchMovies(textValue, pageNumber);
    }
  };

  searchMovies(text, page) {
    this.movieService
      .getMovies(text, page)
      .then((film) => {
        this.setState({
          movies: [...film.results],
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
      <AppContext.Provider value={genres}>
        <section className="app">
          <div className="app__wrapper">
            <Tabs defaultActiveKey="1" centered onChange={() => this.getIdSessionMovies()}>
              <TabPane tab="Search" key="1">
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
                    <PaginationPage
                      paginate={this.paginate}
                      currentPage={currentPage}
                      loading={loading}
                      totalPages={totalPages}
                    />
                  )}
                </div>
              </TabPane>
              <TabPane tab="Rated" key="2" onChange={() => this.getIdSessionMovies()}>
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
      </AppContext.Provider>
    );
  }
}
