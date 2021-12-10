export class MovieService {
  async getResource(url, option) {
    const res = await fetch(`${process.env.REACT_APP_API}${url}`, option);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    const result = await res.json();
    return result;
  }

  async getMovies(movie, page) {
    const res = await this.getResource(
      `search/movie/?api_key=${process.env.REACT_APP_API_KEY}&query=${movie}&page=${page}`
    );
    return res;
  }

  async getPopularRequest(page) {
    const res = await this.getResource(
      `movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
    );
    return res.results;
  }

  async getPages(textValue, page) {
    const res = await this.getResource(
      `search/movie/?api_key=${process.env.REACT_APP_API_KEY}&query=${textValue}&page=${page}`
    );
    return res;
  }

  async getGenres() {
    const res = await this.getResource(`genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
    return res.genres;
  }

  async newQuestSession() {
    const res = await this.getResource(`authentication/guest_session/new?api_key=${process.env.REACT_APP_API_KEY}`);
    return res.guest_session_id;
  }

  async getRated(id) {
    const res = await this.getResource(
      `guest_session/${id}/rated/movies?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=created_at.asc`
    );
    return res;
  }

  async ratedRequest(id, val, idSession) {
    if (val === 0) {
      return null;
    }
    const res = await this.getResource(
      `movie/${id}/rating?api_key=${process.env.REACT_APP_API_KEY}&guest_session_id=${idSession}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({
          value: val,
        }),
      }
    );
    return res;
  }
}
