export default function Header({
  user,
  userType,
  searchTerm,
  setSearchTerm,
  handleSearch,
}) {
  return (
    <header className="flex items-center justify-between px-8 py-6 sticky top-0 z-20 bg-black/90 backdrop-blur-sm border-b border-zinc-900/50">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Buscar artistas, bandas..."
          className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-full py-2 pl-12 pr-4 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold text-white">
            {user.usuario || user.nome_usuario}
          </p>
          <p className="text-xs text-zinc-500 capitalize">{userType}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-linear-to-r from-yellow-300 to-pink-500 p[2px]">
          <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center font-bold text-sm">
            {user.usuario ? user.usuario.substring(0, 2).toUpperCase() : "U"}
          </div>
        </div>
      </div>
    </header>
  );
}
