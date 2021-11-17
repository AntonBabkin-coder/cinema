export default class MovieService {
  async getResource(url) {
    const api = `https://api.themoviedb.org/3/`;
    const res = await fetch(`${api}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    const result = await res.json();
    return result;
  }

  async getMovie(movie, page) {
    const res = await this.getResource(
      `search/movie/?api_key=d463c0adb705ecd658e35005ed93e66d&query=${!movie ? 'return' : movie}&page=${page}`
    );
    return res.results;
  }

  async getGenres() {
    const res = await this.getResource('genre/movie/list?api_key=d463c0adb705ecd658e35005ed93e66d&language=en-US');
    return res.genres;
  }

  async newQuestSession() {
    const res = await this.getResource('authentication/guest_session/new?api_key=d463c0adb705ecd658e35005ed93e66d');
    return res.guest_session_id;
  }

  async getRated(id) {
    console.log(id);
    const res = await this.getResource(
      `guest_session/${id}/rated/movies?api_key=d463c0adb705ecd658e35005ed93e66d&language=en-US&sort_by=created_at.asc`
    );
    console.log(res);
    return res;
  }

  async postRated(id, val, idSession) {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/rating?api_key=d463c0adb705ecd658e35005ed93e66d&guest_session_id=${idSession}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({
          value: val,
        }),
      }
    );

    const result = await res.json();
    return result;
  }
}
