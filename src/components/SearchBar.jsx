import { useState } from 'react'

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      return
    }

    onSearch(trimmedQuery)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 mb-10"
    >
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search movies..."
        className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
      />

      <button
        type="submit"
        className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition"
      >
        Search
      </button>
    </form>
  )
}

export default SearchBar