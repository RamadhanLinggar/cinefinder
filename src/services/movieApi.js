const BASE_URL = 'https://api.themoviedb.org/3'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
}

export async function getPopularMovies() {
  const response = await fetch(
    `${BASE_URL}/movie/popular?language=en-US&page=1`,
    options
  )

  if (!response.ok) {
    throw new Error('Failed to fetch popular movies')
  }

  const data = await response.json()

  return data.results
}

export async function getMovieDetail(id) {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?language=en-US`,
    options
  )

  if (!response.ok) {
    throw new Error('Failed to fetch movie detail')
  }

  const data = await response.json()

  return data
}

export async function searchMovies(query) {
  const response = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`,
    options
  )

  if (!response.ok) {
    throw new Error('Failed to search movies')
  }

  const data = await response.json()

  return data.results
}

export async function getMovieGenres() {
  const response = await fetch(
    `${BASE_URL}/genre/movie/list?language=en-US`,
    options
  )

  if (!response.ok) {
    throw new Error('Failed to fetch movie genres')
  }

  const data = await response.json()

  return data.genres
}

export async function getMoviesByGenre(genreId) {
  const response = await fetch(
    `${BASE_URL}/discover/movie?with_genres=${genreId}&language=en-US&page=1`,
    options
  )

  if (!response.ok) {
    throw new Error('Failed to fetch movies by genre')
  }

  const data = await response.json()

  return data.results
}

export async function getMovieVideos(id) {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/videos?language=en-US`,
    options
  )

  if (!response.ok) {
    throw new Error('Failed to fetch movie videos')
  }

  const data = await response.json()

  return data.results
}