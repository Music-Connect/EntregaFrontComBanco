import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const artistProposals = [
  {
    id: 1,
    title: "Festival de Verão 2024",
    subtitle: "Eventos SP Ltda",
    info1: "15 Dez • 20:00",
    info2: "R$ 2.500",
    status: "Novo",
    color: "text-green-400",
  },
  {
    id: 2,
    title: "Música ao Vivo - Casamento",
    subtitle: "Cerimonial Dreams",
    info1: "20 Jan • 18:30",
    info2: "R$ 800",
    status: "Pendente",
    color: "text-green-400",
  },
  {
    id: 3,
    title: "Abertura de Show",
    subtitle: "Bar do Rock",
    info1: "05 Fev • 22:00",
    info2: "R$ 1.200",
    status: "Novo",
    color: "text-green-400",
  },
  {
    id: 4,
    title: "Aniversário Privado",
    subtitle: "João Silva",
    info1: "12 Fev • 14:00",
    info2: "A combinar",
    status: "Pendente",
    color: "text-white",
  },
];

const featuredArtists = [
  {
    id: 1,
    title: "The Night Owls",
    subtitle: "Jazz / Blues",
    info1: "São Paulo, SP",
    info2: "⭐ 4.9 (50+ shows)",
    status: "Disponível",
    color: "text-yellow-400",
  },
  {
    id: 2,
    title: "Marina & Violão",
    subtitle: "MPB / Acústico",
    info1: "Rio de Janeiro, RJ",
    info2: "⭐ 4.8 (20+ shows)",
    status: "Disponível",
    color: "text-yellow-400",
  },
  {
    id: 3,
    title: "DJ K-Beat",
    subtitle: "Eletrônica / House",
    info1: "Curitiba, PR",
    info2: "⭐ 5.0 (100+ shows)",
    status: "Ocupado",
    color: "text-yellow-400",
  },
  {
    id: 4,
    title: "Rock Band 80s",
    subtitle: "Rock Clássico",
    info1: "Belo Horizonte, MG",
    info2: "⭐ 4.7 (15 shows)",
    status: "Disponível",
    color: "text-yellow-400",
  },
];

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedType = localStorage.getItem("type");

    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(JSON.parse(storedUser));
      setUserType(storedType);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("type");
    navigate("/login");
  };
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/explore?search=${searchTerm}`);
    }
  };

  if (!user) return null;

  const isArtist = userType === "artista";
  const dataList = isArtist ? artistProposals : featuredArtists;

  const bannerTitle = isArtist ? (
    <>
      Complete seu perfil para receber mais{" "}
      <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-300 via-pink-500 to-purple-500">
        Propostas
      </span>
    </>
  ) : (
    <>
      Encontre o talento ideal para o seu{" "}
      <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-300 via-pink-500 to-purple-500">
        Próximo Evento
      </span>
    </>
  );

  const bannerDesc = isArtist
    ? "Contratantes costumam fechar 3x mais negócios com artistas que possuem fotos de alta qualidade e repertório atualizado."
    : "Explore nossa base com mais de 5.000 artistas verificados e garanta a trilha sonora perfeita com segurança.";

  const bannerBtn = isArtist ? "Editar Perfil Agora" : "Buscar Artistas";
  const sectionTitle = isArtist ? "Propostas Recentes" : "Artistas em Destaque";
  const badgeText = isArtist ? "Dica do dia" : "Novidade";

  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
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
            <NavItem icon={isArtist ? "" : ""}>
              {isArtist ? "Propostas" : "Meus Eventos"}
            </NavItem>
            <NavItem icon={isArtist ? "" : ""}>
              {isArtist ? "Agenda" : "Buscar Talentos"}
            </NavItem>
            <NavItem icon="">Mensagens</NavItem>
          </div>

          <div className="space-y-4 mt-6">
            <p className="text-xs font-bold text-zinc-600 uppercase tracking-wider">
              {isArtist ? "Perfil" : "Organização"}
            </p>
            <div onClick={() => navigate("/profile")}>
              <NavItem icon={isArtist ? "" : ""}>
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

      <main className="flex-1 flex flex-col relative overflow-y-auto scrollbar-hide">
        <header className="flex items-center justify-between px-8 py-6 sticky top-0 z-20 bg-black/90 backdrop-blur-sm border-b border-zinc-900/50">
          <div className="relative w-full max-w-md">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"></span>
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
                {user.usuario
                  ? user.usuario.substring(0, 2).toUpperCase()
                  : "U"}
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="w-full relative h-72 rounded-3xl overflow-hidden group border border-zinc-800 mb-10">
            <div className="lg:col-span-2 relative h-72 rounded-3xl overflow-hidden group border border-zinc-800">
              <div className="absolute inset-0 bg-linear-to-r from-zinc-900 to-black"></div>

              <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl"></div>

              <div className="relative z-10 h-full flex flex-col justify-center p-10">
                <span className="text-yellow-300 font-bold tracking-wider text-xs mb-3 uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse"></span>
                  {badgeText}
                </span>
                <h1 className="text-4xl font-black text-white mb-4 leading-tight max-w-lg">
                  {bannerTitle}{" "}
                </h1>
                <p className="text-zinc-400 text-sm max-w-md mb-8">
                  {bannerDesc}
                </p>
                <div>
                  <button className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-zinc-200 transition-colors">
                    {bannerBtn}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                {sectionTitle}
                <span className="text-xs font-normal bg-pink-500/10 text-pink-500 px-2 py-1 rounded-full border border-pink-500/20">
                  4 {isArtist ? "Novas" : "Disponíveis"}
                </span>
              </h2>
              <button className="text-sm text-zinc-400 hover:text-white transition">
                Ver todos
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {dataList.map((item) => (
                <div
                  key={item.id}
                  className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-2xl hover:border-zinc-700 transition-all group relative overflow-hidden flex flex-col justify-between h-full"
                >
                  <div
                    className={`absolute top-0 right-0 px-3 py-1 text-[10px] font-bold rounded-bl-xl ${
                      item.status === "Novo" || item.status === "Disponível"
                        ? "bg-yellow-400 text-black"
                        : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    {item.status}
                  </div>

                  <div>
                    <div className="mb-4">
                      {!isArtist && (
                        <div className="w-12 h-12 rounded-full bg-zinc-800 mb-3 flex items-center justify-center text-xl">
                          🎸
                        </div>
                      )}
                      <h3
                        className="font-bold text-white text-lg mb-1 truncate"
                        title={item.title}
                      >
                        {item.title}
                      </h3>
                      <p className="text-sm text-zinc-400 flex items-center gap-1 truncate">
                        {isArtist ? "🏢" : "🎵"} {item.subtitle}
                      </p>
                    </div>

                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-500">
                          {isArtist ? "Data" : "Local"}
                        </span>
                        <span className="text-zinc-300">{item.info1}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-500">
                          {isArtist ? "Cache" : "Avaliação"}
                        </span>
                        <span className={`font-bold ${item.color}`}>
                          {item.info2}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <button className="flex-1 bg-white/5 hover:bg-green-500/20 hover:text-green-400 hover:border-green-500/50 border border-zinc-700 text-zinc-300 py-2 rounded-lg text-xs font-bold transition-all">
                      {isArtist ? "Aceitar" : "Convidar"}
                    </button>
                    <button className="flex-1 bg-white/5 hover:bg-zinc-800 hover:text-white border border-zinc-700 text-zinc-400 py-2 rounded-lg text-xs font-bold transition-all">
                      {isArtist ? "Recusar" : "Ver Perfil"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
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

export default Dashboard;
