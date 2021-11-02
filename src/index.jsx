import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';


ReactDOM.render(
<React.StrictMode>
  <App />
</React.StrictMode>,
 document.getElementById('root'));







// export default class MovieService {
//   async getResource() {
//     const res = await fetch('https://api.themoviedb.org/3/movie/550?api_key=d463c0adb705ecd658e35005ed93e66d');
//     const body = await res.json();
//     return body;
//   }

//   async getMovies() {
//     const img = await fetch('https://image.tmdb.org/t/p/w500')
//     const body = await img.json()
//     return body;
// }
  
    
// }

// //const img = await fetch('https://image.tmdb.org/t/p/w500')

// const movie = new MovieService();
// movie.getResource().then((body) => console.log(body))
