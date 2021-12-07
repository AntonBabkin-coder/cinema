export default class MovieService {
  apiKey = 'api_key=d463c0adb705ecd658e35005ed93e66d';

  async getResource(url, post) {
    const api = `https://api.themoviedb.org/3/`;
    const res = await fetch(`${api}${url}`, post);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    const result = await res.json();
    return result;
  }

  async getMovie(movie, page) {
    const res = await this.getResource(`search/movie/?${this.apiKey}&query=${movie}&page=${page}`);
    return res.results;
  }

  async getPopular(page) {
    const res = await this.getResource(`movie/popular?${this.apiKey}&language=en-US&page=${page}`);
    return res.results;
  }

  async getPages(textValue, page) {
    const res = await this.getResource(`search/movie/?${this.apiKey}&query=${textValue}&page=${page}`);
    return res;
  }

  async getGenres() {
    const res = await this.getResource(`genre/movie/list?${this.apiKey}&language=en-US`);
    return res.genres;
  }

  async newQuestSession() {
    const res = await this.getResource(`authentication/guest_session/new?${this.apiKey}`);
    return res.guest_session_id;
  }

  async getRated(id) {
    const res = await this.getResource(
      `guest_session/${id}/rated/movies?${this.apiKey}&language=en-US&sort_by=created_at.asc`
    );
    return res;
  }

  async postRated(id, val, idSession) {
    const res = await this.getResource(`movie/${id}/rating?${this.apiKey}&guest_session_id=${idSession}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        value: val,
      }),
    });
    return res;
  }
}
