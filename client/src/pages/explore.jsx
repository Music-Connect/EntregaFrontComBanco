import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import axios from "axios";

const genres = ["Rock", "Pop", "Sertanejo", "Eletrônica", "MPB", "Jazz"];
const types = ["Todos", "Artistas", "Bandas", "Contratantes"];

function Explore() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialSearch = searchParams.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("Todos");

  const fetchUsers = async (term) => {
    setLoading(true);
    try {
      const url = term
        ? `http://localhost:3000/auth/users?search=${term}`
        : `http://localhost:3000/auth/users`;

      const response = await axios.get(url);
      setResults(response.data);
    } catch (error) {
      console.error("Erro ao buscar:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSearchTerm(initialSearch);
    fetchUsers(initialSearch);
  }, [initialSearch]);

  const handleSearchKey = (e) => {
    if (e.key === "Enter") {
      navigate(`/explore?search=${searchTerm}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white font-sans">
      <aside className="w-64 border-r border-zinc-900 p-6 hidden md:block sticky top-0 h-screen overflow-y-auto">
        <div
          className="flex items-center gap-3 mb-8 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center hover:bg-white hover:text-black transition">
            ←
          </div>
          <span className="font-bold text-sm">Voltar</span>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
              Status
            </h3>
            <div className="space-y-2">
              <FilterCheckbox label="Disponível para Shows" checked />
              <FilterCheckbox label="Agenda Aberta" />
              <FilterCheckbox label="Novos Perfis" />
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
              Gêneros
            </h3>
            <div className="flex flex-wrap gap-2">
              {genres.map((g) => (
                <span
                  key={g}
                  className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 hover:border-pink-500 hover:text-white cursor-pointer transition"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
              Localização
            </h3>
            <select className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-sm text-zinc-400 outline-none focus:border-yellow-400">
              <option>Todo o Brasil</option>
              <option>São Paulo, SP</option>
              <option>Rio de Janeiro, RJ</option>
            </select>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-white mb-6">
            Explorar Talentos
          </h1>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                🔍
              </span>
              <input
                type="text"
                className="w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearchKey}
                placeholder="Busque por nome, estilo ou instrumento..."
              />
            </div>
            <button className="bg-white text-black font-bold px-8 py-3 rounded-xl hover:bg-yellow-300 transition shadow-lg shadow-yellow-500/10">
              Buscar
            </button>
          </div>

          <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition whitespace-nowrap ${
                  selectedType === type
                    ? "bg-linear-to-r from-yellow-300 to-pink-500 text-black"
                    : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </header>

        <div>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            {loading
              ? "Carregando..."
              : `${results.length} Resultados encontrados`}
          </h2>

          {!loading && results.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 bg-zinc-900/20 rounded-3xl border border-zinc-800 border-dashed">
              <div className="text-4xl mb-4">😕</div>
              <p className="text-zinc-400 text-lg font-medium">
                Nenhum talento encontrado para "{searchTerm}"
              </p>
              <p className="text-zinc-600 text-sm">
                Tente termos mais genéricos ou limpe os filtros.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((user) => (
              <div
                key={user.id_usuario}
                className="group bg-zinc-900 border border-zinc-800 p-4 rounded-2xl hover:border-zinc-600 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col h-full"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-zinc-800">
                  <div className="absolute inset-0 bg-linear-to-br from-zinc-800 to-black group-hover:scale-105 transition-transform duration-500"></div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-linear-to-tr from-yellow-300 to-pink-500 p[2px] shadow-2xl">
                      <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-bold text-2xl text-white">
                        {user.usuario.substring(0, 2).toUpperCase()}
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-[10px] uppercase font-bold border border-white/10">
                    {user.tipo_usuario}
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-white text-lg truncate group-hover:text-yellow-300 transition">
                    {user.usuario}
                  </h3>
                  <p className="text-zinc-500 text-xs font-medium uppercase tracking-wide mb-3">
                    {user.local_atuacao || "Local não informado"}
                  </p>

                  <p className="text-zinc-400 text-sm line-clamp-2 mb-4 h-10 leading-relaxed">
                    {user.descricao || "Artista sem descrição..."}
                  </p>
                </div>

                {/* Footer do Card */}
                <div className="pt-4 border-t border-zinc-800 flex justify-between items-center mt-auto">
                  <div className="text-xs text-zinc-500">
                    <span className="text-green-400 font-bold">●</span>{" "}
                    Disponível
                  </div>
                  <button className="text-xs font-bold text-white bg-white/10 hover:bg-white hover:text-black px-4 py-2 rounded-lg transition">
                    Ver Perfil
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function FilterCheckbox({ label, checked }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div
        className={`w-5 h-5 rounded border flex items-center justify-center transition ${
          checked
            ? "bg-pink-600 border-pink-600"
            : "border-zinc-700 group-hover:border-zinc-500"
        }`}
      >
        {checked && <span className="text-white text-xs">✓</span>}
      </div>
      <span className="text-zinc-400 text-sm group-hover:text-white transition">
        {label}
      </span>
    </label>
  );
}

export default Explore;
