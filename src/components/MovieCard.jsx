import { Link } from 'react-router-dom'

function MovieCard({ movie }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster'

  return (
    <Link to={`/movies/${movie.id}`}>
      <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-slate-600 hover:-translate-y-1 transition">

        <div className="relative group">
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full aspect-[2/3] object-cover"
          />

          <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition flex items-end p-4">
            <p className="text-sm text-slate-200 line-clamp-4">
              {movie.overview || 'No overview available.'}
            </p>
          </div>
        </div>

        <div className="p-4">
          <h2 className="font-semibold text-white truncate">
            {movie.title}
          </h2>

          <div className="flex items-center justify-between mt-2 text-sm">
            <span className="text-yellow-400">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>

            <span className="text-slate-400">
              {movie.release_date?.slice(0, 4) || 'N/A'}
            </span>
          </div>
        </div>

      </div>
    </Link>
  )
}

export default MovieCard