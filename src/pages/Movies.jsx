import { useEffect, useState } from "react";
import {
  getPopularMovies,
  getMovieGenres,
  getMoviesByGenre,
  searchMovies,
} from "../services/movieApi";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const [moviesData, genresData] = await Promise.all([
          getPopularMovies(),
          getMovieGenres(),
        ]);

        setMovies(moviesData);
        setGenres(genresData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchInitialData();
  }, []);

  async function handleSearch(query) {
    setSearchQuery(query);
    setSelectedGenre(null);
    setLoading(true);
    setError(null);

    try {
      const data = await searchMovies(query);
      setMovies(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleGenreChange(genreId) {
    setSelectedGenre(genreId);
    setSearchQuery("");
    setLoading(true);
    setError(null);

    try {
      if (genreId === null) {
        const data = await getPopularMovies();
        setMovies(data);
      } else {
        const data = await getMoviesByGenre(genreId);
        setMovies(data);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Movies</h1>

        <SearchBar onSearch={handleSearch} />

        <div className="flex flex-wrap gap-3 mb-10">
          <button
            onClick={() => handleGenreChange(null)}
            className={`px-4 py-2 rounded-lg transition ${
              selectedGenre === null && !searchQuery
                ? "bg-red-600 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            All
          </button>

          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleGenreChange(genre.id)}
              className={`px-4 py-2 rounded-lg transition ${
                selectedGenre === genre.id
                  ? "bg-red-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>

        {searchQuery && (
          <h2 className="text-xl font-semibold mb-6">
            Search results for "{searchQuery}"
          </h2>
        )}

        {error && <ErrorMessage message={error} />}

        {loading ? (
          <Loading />
        ) : movies.length === 0 ? (
          <p className="text-slate-400">No movies found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default Movies;
