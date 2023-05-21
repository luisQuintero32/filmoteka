import { API_KEY } from './config';
import { generatePages } from './pagination';

const watchedBtn = document.getElementById('watched-movies--btn');
const queueBtn = document.getElementById('queue-movies--btn');
const watchedContainer = document.getElementById('movies-container');
const ulPages = document.querySelector('.pagination__page');
let currentPage = 1;
let totalPages = 1;

watchedBtn.addEventListener('click', renderwatchedMovies);

function renderwatchedMovies() {
  
  watchedBtn.classList.add('current--btn');
  queueBtn.classList.remove('current--btn')

  const watchedMoviesList = JSON.parse(localStorage.getItem('watchedList'));
  let moviesHTML = '';

  const fetchPromises = watchedMoviesList.map(movieID => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&language=en`
    ).then(response => response.json());
  });

  const total_pages = watchedMoviesLength => {
    return watchedMoviesLength >= 20 ? Math.ceil(watchedMoviesLength / 20) : 1;
  };

  fetchMovies(1);

  function fetchMovies(currentPage) {
    let moviesHTML = '';
    Promise.all(fetchPromises)
      .then(moviesData => {
        const watchedMoviesLength = watchedMoviesList.length;
        totalPages = total_pages(watchedMoviesLength);
        const li = generatePages(currentPage, totalPages);
        ulPages.innerHTML = li;

        const pageSize = 20;
        const startIndex = currentPage === 1 ? 0 : (currentPage - 1) * pageSize;
        const endIndex = Math.min(currentPage * pageSize, moviesData.length);

        for (let i = startIndex; i < endIndex; i++) {
          const data = moviesData[i];
          if (data.release_date === '') {
            data.release_date = 'Sin año registrado';
          }
          const baseImageUrl = 'https://image.tmdb.org/t/p/';
          const moviePoster = `${baseImageUrl}w500${data.poster_path}`;
          const genreNames = data.genres.map(genre => genre.name).join(' | ');
          const movieHTML = `
            <div class="photo-card">
              <div class="info">
                <a onclick="openModal('${data.id}')" class="info__poster">
                  <img class="info__poster--img" src="${moviePoster}" alt="${data.title
            }" loading="lazy" width="100px" height="100px" id="info__poster--img" />
                </a>
                <h3 class="info__title">
                  <strong class="title">${data.title}</strong>
                </h3>
                <p class="info__genre">
                  ${genreNames} | ${new Date(data.release_date).getFullYear()}
                </p>
                <p class="info-item"></p>
              </div>
            </div>
          `;
          moviesHTML += movieHTML;
        }

        watchedContainer.innerHTML = moviesHTML;
      })
      .catch(error => console.error(error));
  }

  function handlePageClick(event) {
    if (event.target.tagName === 'LI') {
      const clickedValue = event.target.innerText;
      const clickedValueInt = parseInt(clickedValue);
      if (clickedValue === '...') {
      } else {
        currentPage = clickedValueInt;
        event.stopPropagation();
        fetchMovies(currentPage);
      }
    }
  }

  ulPages.addEventListener('click', handlePageClick);

  document
    .getElementById('library__prev-page')
    .addEventListener('click', async () => {
      if (currentPage > 1) {
        currentPage--;
        await fetchMovies(parseInt(currentPage));
        updateCurrentPageText(currentPage);
      }
    });

  document
    .getElementById('library__next-page')
    .addEventListener('click', async () => {
      if (currentPage < totalPages) {
        currentPage++;
        await fetchMovies(parseInt(currentPage));
        updateCurrentPageText(parseInt(currentPage));
      }
    });

  function updateCurrentPageText() {
    const currentPageElement = document.getElementById('current-page');
    currentPageElement.innerText = currentPage;
  }
}
