import { API_KEY } from './config';
export const getGenres = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YWFlYzdiNzAxNjQwOTQzNjk0ODU2NzRkYmE3NmY2MiIsInN1YiI6IjY0NTlhOWEyNzdkMjNiMDEzNjVkZDJlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KhcKUdwkddD7iZWM02lRSUXeaIlmMwnz5XvQav89l20',
    },
  };

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${API_KEY}`,
      options
    );

    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
