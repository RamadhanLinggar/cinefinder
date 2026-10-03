import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import { getFavorites } from '../services/favoriteService'

function Favorites() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    setFavorites(getFavorites())
  }, [])

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          My Favorites
        </h1>

        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg mb-4">
              You don't have any favorite movies yet.
            </p>

            <Link
              to="/"
              className="inline-block bg-red-600 hover:bg-red-700 px-5 py-3 rounded-lg font-semibold transition"
            >
              Discover Movies
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {favorites.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
              />
            ))}
          </div>
        )}

      </div>
    </main>
  )
}

export default Favorites