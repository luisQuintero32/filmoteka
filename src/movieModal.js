import { API_KEY } from "./config";

const watchedList = JSON.parse(localStorage.getItem('watchedList')) || [];
const queueList = JSON.parse(localStorage.getItem('queueList')) || [];

const addToWatchedBtn = document.getElementById('add-to-watched--btn');
const addToQueueBtn = document.getElementById('add-to-queue--btn');

const btnCloseModal = document.getElementById('movie-modal--close-btn');
const modal = document.getElementById('movie-modal');
btnCloseModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.openModal = function (movie) {

    const modal = document.getElementById('movie-modal');
    modal.style.display = 'flex';
    getMovieData(movie)

}

function getMovieData(movieID) {
    const baseImageUrl = 'https://image.tmdb.org/t/p/';
    const movieId = movieID; // ID de la película que deseas buscar
    const language = 'en'; // Idioma en el que deseas recibir la respuesta


    const img = document.getElementById('movie-modal--image');
    const title = document.getElementById('movie-modal-title');
    const votes = document.getElementById('movie-modal-votes');
    const popularity = document.getElementById('movie-modal-popularity');
    const originalTitle = document.getElementById('movie-modal-original-title');
    const genre = document.getElementById('movie-modal-genre');
    const about = document.getElementById('movie-modal-about');
    const watchedBtn = document.getElementById('add-to-watched--btn');
    const queueBtn = document.getElementById('add-to-queue--btn');

    const updatedQueueMoviesList = queueList.filter(movie => movie !== movieID);
    const updatedWatchedMoviesList = watchedList.filter(movie => movie !== movieID);

    if (updatedQueueMoviesList.length !== queueList.length) {
        queueBtn.textContent = 'Remove from queue'
        addToQueueBtn.addEventListener('click', () => {
            removeFromQueue(updatedQueueMoviesList)
        })
    } else if ((!queueList || (updatedQueueMoviesList.length === queueList.length))) {
        queueBtn.textContent = 'Add to queue'
        addToQueueBtn.addEventListener('click', () => {
            addToQueue()
            removeFromWatched(watchedList.filter(movie => movie !== movieID));
        })
    }

    if (updatedWatchedMoviesList.length !== watchedList.length) {
        watchedBtn.textContent = 'Remove from watched'
        addToWatchedBtn.addEventListener('click', () => {
            removeFromWatched(updatedWatchedMoviesList)
        })
    } else if ((!watchedList) || (updatedWatchedMoviesList.length === watchedList.length)) {
        watchedBtn.textContent = 'Add to watched'
        addToWatchedBtn.addEventListener('click', () => {
            addToWatched()
            removeFromQueue(queueList.filter(movie => movie !== movieID))
        })
    }

    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=${language}`)
        .then(response => response.json())
        .then(data => {
            img.src = `${baseImageUrl}w500${data.poster_path}`;
            title.textContent = data.title;
            votes.textContent = data.vote_average + ' / ' + data.vote_count;
            popularity.textContent = data.popularity;
            originalTitle.textContent = data.original_title;
            // genre.textContent = data.genres;
            const genreName = data.genres.map((genre) => genre.name).join(' | ');
            // console.log(genreName);
            genre.textContent = genreName;

            about.textContent = data.overview;
            addToWatchedBtn.value = data.id;
            addToQueueBtn.value = data.id;
        })
        .catch(error => console.error(error));
}
function addToWatched() {
    const watchedList = JSON.parse(localStorage.getItem('watchedList')) || [];

    if (!watchedList) {
        watchedList = JSON.stringify([addToWatchedBtn.value]);
    } else {
        const idExists = watchedList.includes(addToWatchedBtn.value)
        if (!idExists) {
            watchedList.push(addToWatchedBtn.value);
            localStorage.setItem('watchedList', JSON.stringify(watchedList));
        }
    }

    modal.style.display = 'none';
    location.reload()
}
function addToQueue() {
    if (!queueList) {
        queueList = JSON.stringify([addToQueueBtn.value]);
    } else {
        const idExists = queueList.includes(addToQueueBtn.value)
        if (!idExists) {
            queueList.push(addToQueueBtn.value);
            localStorage.setItem('queueList', JSON.stringify(queueList));
        }
    }
    modal.style.display = 'none';
    location.reload()
}

function removeFromQueue(updatedQueueMoviesList) {
    localStorage.setItem('queueList', JSON.stringify(updatedQueueMoviesList));
    modal.style.display = 'none';
    location.reload()
}

function removeFromWatched(updatedWatchedMoviesList) {
    localStorage.setItem('watchedList', JSON.stringify(updatedWatchedMoviesList));
    modal.style.display = 'none';
    location.reload()
}





