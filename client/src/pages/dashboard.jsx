import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Title from "../components/layout/Title";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState("");

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

  if (!user)
    return <div className="text-white text-center mt-20">Carregando...</div>;

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar Lateral */}
      <aside className="w-64 bg-zinc-900 hidden md:flex flex-col p-6 border-r border-zinc-800">
        <h2 className="text-2xl font-bold mb-10 text-yellow-300">
          Music<span className="text-pink-500">Connect</span>
        </h2>

        <nav className="flex flex-col gap-4 flex-1">
          <button className="text-left text-zinc-300 hover:text-white hover:bg-zinc-800 p-2 rounded transition">
            Início
          </button>
          <button className="text-left text-zinc-300 hover:text-white hover:bg-zinc-800 p-2 rounded transition">
            Meus Eventos
          </button>
          <button className="text-left text-zinc-300 hover:text-white hover:bg-zinc-800 p-2 rounded transition">
            Mensagens
          </button>
          <button className="text-left text-zinc-300 hover:text-white hover:bg-zinc-800 p-2 rounded transition">
            Configurações
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="text-red-400 hover:text-red-300 mt-auto font-bold text-left p-2"
        >
          🚪 Sair
        </button>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold">
              Olá,{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-300 to-pink-500">
                {user.nome_usuario}
              </span>
            </h1>
            <p className="text-zinc-400 capitalize">Perfil: {userType}</p>
          </div>

          {/* Botão Sair visível apenas no Mobile */}
          <button
            onClick={handleLogout}
            className="md:hidden text-red-400 font-bold border border-red-900 p-2 rounded"
          >
            Sair
          </button>
        </div>

        {/* Cards de Exemplo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <h3 className="text-zinc-400 mb-2">Visualizações</h3>
            <p className="text-3xl font-bold text-white">1.2k</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <h3 className="text-zinc-400 mb-2">Conexões</h3>
            <p className="text-3xl font-bold text-white">34</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <h3 className="text-zinc-400 mb-2">Mensagens</h3>
            <p className="text-3xl font-bold text-white">5</p>
          </div>
        </div>

        {/* Área de Conteúdo */}
        <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 min-h-[300px]">
          <h2 className="text-xl font-bold mb-4 border-b border-zinc-700 pb-2">
            Atividades Recentes
          </h2>
          <p className="text-zinc-400">
            Você ainda não tem atividades recentes. Comece explorando a
            plataforma!
          </p>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
