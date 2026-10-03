import { NavLink } from 'react-router-dom'

function Navbar() {
  const navClass = ({ isActive }) =>
    isActive
      ? 'text-white font-semibold'
      : 'text-slate-400 hover:text-white transition'

  return (
    <nav className="border-b border-slate-800 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <NavLink to="/" className="text-2xl font-bold text-white">
          Cine<span className="text-red-500">Finder</span>
        </NavLink>

        <div className="flex gap-6">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>

          <NavLink to="/movies" className={navClass}>
            Movies
          </NavLink>

          <NavLink to="/favorites" className={navClass}>
            Favorites
          </NavLink>
        </div>

      </div>
    </nav>
  )
}

export default Navbar