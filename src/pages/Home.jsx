import { useEffect, useState } from "react";
import { getPopularMovies, searchMovies } from "../services/movieApi";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchPopularMovies() {
      try {
        const data = await getPopularMovies();
        setMovies(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPopularMovies();
  }, []);

  async function handleSearch(query) {
    setSearchQuery(query);
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

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <Loading />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-950 text-white px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <ErrorMessage message={error} />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6">CineFinder</h1>

        <p className="text-slate-400 mb-8">Discover movies you'll love.</p>

        <SearchBar onSearch={handleSearch} />

        <h2 className="text-2xl font-bold text-white mb-6">
          {searchQuery
            ? `Search results for "${searchQuery}"`
            : "Popular Movies"}
        </h2>

        {movies.length === 0 ? (
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

export default Home;
