export function MovieCard({ title, releaseYear, posterPath, genres, id }) {
  const baseImageUrl = 'https://image.tmdb.org/t/p/';
  const moviePoster = `${baseImageUrl}w500${posterPath}`;
  const genreNames = genres.map(genre => genre.name).join(' | ');

  // Obtener solo el año de la fecha de lanzamiento
  const year = new Date(releaseYear).getFullYear();

  return `
    <div class="photo-card">
      <div class="info">
        <a onclick="openModal('${id}')" class="info__poster">
          <img class="info__poster--img" src="${moviePoster}" alt="${title}" loading="lazy" width="100px" height="100px" id="info__poster--img" />
        </a>
        <h3 class="info__title">
          <strong class="title">${title}</strong>
        </h3>
        <p class="info__genre">
          ${genreNames} | ${year}
        </p>
        <p class="info-item"></p>
      </div>
    </div>
  `;
}
