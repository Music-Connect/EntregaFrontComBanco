export default function Sidebar({
  isArtist,
  navigate,
  handleLogout,
  activePage,
}) {
  return (
    <aside className="w-64 hidden md:flex flex-col p-8 border-r border-zinc-900 bg-black">
      <div className="text-2xl font-black mb-10">
        <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-300 to-pink-500">
          Music Connect
        </span>
      </div>

      <nav className="flex flex-col gap-6 text-sm font-medium text-zinc-400">
        <div className="space-y-4">
          <p className="text-xs font-bold text-zinc-600 uppercase tracking-wider">
            Painel
          </p>

          <div onClick={() => navigate("/dashboard")}>
            <NavItem
              icon="kb"
              active={activePage === "dashboard" || !activePage}
            >
              Visão Geral
            </NavItem>
          </div>

          <div onClick={() => navigate("/proposals")}>
            <NavItem icon="doc" active={activePage === "proposals"}>
              {isArtist ? "Propostas" : "Minhas Contratações"}
            </NavItem>
          </div>

          <div onClick={() => navigate("/explore")}>
            <NavItem icon="search" active={activePage === "explore"}>
              Explorar
            </NavItem>
          </div>
        </div>

        <div className="space-y-4 mt-6">
          <p className="text-xs font-bold text-zinc-600 uppercase tracking-wider">
            {isArtist ? "Perfil" : "Organização"}
          </p>
          <div onClick={() => navigate("/profile")}>
            <NavItem icon="user" active={activePage === "profile"}>
              {isArtist ? "Meu Perfil" : "Minha Empresa"}
            </NavItem>
          </div>
          <div onClick={() => navigate("/settings")}>
            <NavItem icon="cog" active={activePage === "settings"}>
              Configurações
            </NavItem>
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
  const icons = {
    kb: "📊",
    doc: "Tb",
    search: "Mw",
    user: "👤",
    cog: "⚙️",
  };

  return (
    <div
      className={`flex items-center gap-3 cursor-pointer py-2 px-3 rounded-lg transition-all duration-200 ${
        active
          ? "text-white bg-zinc-900 border-r-2 border-pink-500"
          : "hover:text-white hover:bg-zinc-900/50"
      }`}
    >
      <span>{children}</span>
    </div>
  );
}
