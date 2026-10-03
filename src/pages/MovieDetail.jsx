import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetail, getMovieVideos } from "../services/movieApi";
import {
  addFavorite,
  removeFavorite,
  isFavorite,
} from "../services/favoriteService";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

function MovieDetail() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    async function fetchMovieDetail() {
      try {
        const data = await getMovieDetail(id);
        const videos = await getMovieVideos(id);

        const trailerVideo = videos.find(
          (video) => video.site === "YouTube" && video.type === "Trailer",
        );

        setMovie(data);
        setTrailer(trailerVideo || null);
        setFavorite(isFavorite(data.id));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMovieDetail();
  }, [id]);

  function handleFavorite() {
    if (!movie) {
      return;
    }

    if (favorite) {
      removeFavorite(movie.id);
      setFavorite(false);
    } else {
      addFavorite(movie);
      setFavorite(true);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <Loading />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-950 text-white px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <ErrorMessage message={error} />
        </div>
      </main>
    );
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
    : "https://via.placeholder.com/780x1170?text=No+Poster";

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[300px_1fr] gap-10">
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full rounded-xl"
          />

          <div>
            <h1 className="text-4xl font-bold">{movie.title}</h1>

            <p className="text-slate-400 mt-2">
              {movie.release_date?.slice(0, 4)} • {movie.runtime} min
            </p>

            <div className="mt-4 text-yellow-400">
              ⭐ {movie.vote_average.toFixed(1)}
            </div>

            <div className="flex flex-wrap gap-2 mt-5">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-slate-800 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <h2 className="text-xl font-semibold mt-8 mb-3">Overview</h2>

            <p className="text-slate-300 leading-relaxed">
              {movie.overview || "No overview available."}
            </p>

            {trailer && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Trailer</h2>

                <div className="aspect-video w-full overflow-hidden rounded-xl">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title={`${movie.title} Trailer`}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            <button
              onClick={handleFavorite}
              className={`mt-8 px-5 py-3 rounded-lg font-semibold transition ${
                favorite
                  ? "bg-slate-700 hover:bg-slate-600"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {favorite ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MovieDetail;
