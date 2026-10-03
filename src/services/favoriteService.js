const FAVORITES_KEY = 'cinefinder_favorites'

export function getFavorites() {
  const favorites = localStorage.getItem(FAVORITES_KEY)

  return favorites ? JSON.parse(favorites) : []
}

export function addFavorite(movie) {
  const favorites = getFavorites()

  const alreadyExists = favorites.some(
    (favorite) => favorite.id === movie.id
  )

  if (alreadyExists) {
    return favorites
  }

  const updatedFavorites = [...favorites, movie]

  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(updatedFavorites)
  )

  return updatedFavorites
}

export function removeFavorite(movieId) {
  const favorites = getFavorites()

  const updatedFavorites = favorites.filter(
    (movie) => movie.id !== movieId
  )

  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(updatedFavorites)
  )

  return updatedFavorites
}

export function isFavorite(movieId) {
  const favorites = getFavorites()

  return favorites.some(
    (movie) => movie.id === movieId
  )
}