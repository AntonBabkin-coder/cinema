export default class MovieService {
  async getResource(url) {
    const api = `https://api.themoviedb.org/3/search/movie/?api_key=d463c0adb705ecd658e35005ed93e66d&query=`;
    const res = await fetch(`${api}${url}`);
    console.log(res);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    const result = await res.json();
    return result;
  }

  async getMovie(movie, page) {
    console.log(page);
    const res = await this.getResource(`${!movie ? 'return' : movie}&page=${page}`);
    return res.results;
  }

  // async getAllMovie(number) {
  //   const res = await this.getResource(`&page=${number}`);
  //   return res.results;
  // }
}

// ${!movie ? 'return' : movie}
