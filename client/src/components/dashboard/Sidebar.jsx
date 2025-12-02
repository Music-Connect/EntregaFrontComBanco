export default function Sidebar({ isArtist, navigate, handleLogout }) {
  return (
    <aside className="w-64 hidden md:flex flex-col p-8 border-r border-zinc-900 bg-black">
      <div className="text-2xl font-black mb-10">
        Music
        <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-300 to-pink-500">
          Connect
        </span>
      </div>

      <nav className="flex flex-col gap-6 text-sm font-medium text-zinc-400">
        <div className="space-y-4">
          <p className="text-xs font-bold text-zinc-600 uppercase tracking-wider">
            Painel
          </p>
          <NavItem icon="" active>
            Visão Geral
          </NavItem>
          <NavItem icon="">
            {isArtist ? "Propostas" : "Minhas Contratações"}
          </NavItem>
          <div onClick={() => navigate("/explore")}>
            <NavItem icon="">Explorar</NavItem>
          </div>
        </div>

        <div className="space-y-4 mt-6">
          <p className="text-xs font-bold text-zinc-600 uppercase tracking-wider">
            {isArtist ? "Perfil" : "Organização"}
          </p>
          <div onClick={() => navigate("/profile")}>
            <NavItem icon="">
              {isArtist ? "Meu Perfil" : "Minha Empresa"}
            </NavItem>
          </div>
          <div onClick={() => navigate("/settings")}>
            <NavItem icon="">Configurações</NavItem>
          </div>
        </div>
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 text-sm text-zinc-500 hover:text-white transition-colors"
      >
        Sair da conta
      </button>
    </aside>
  );
}

function NavItem({ children, icon, active }) {
  return (
    <div
      className={`flex items-center gap-3 cursor-pointer py-2 px-3 rounded-lg transition-all duration-200 ${
        active
          ? "text-white bg-zinc-900 border-r-2 border-pink-500"
          : "hover:text-white hover:bg-zinc-900/50"
      }`}
    >
      <span className={`text-lg ${active ? "text-pink-500" : "opacity-70"}`}>
        {icon}
      </span>
      <span>{children}</span>
    </div>
  );
}
