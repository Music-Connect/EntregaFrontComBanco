import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

// Importando os componentes
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import DashboardBanner from "../components/dashboard/DashboardBanner";
import ProposalCard from "../components/dashboard/ProposalCard";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedType = localStorage.getItem("type");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    const fetchProposals = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/auth/contracts",
          {
            params: {
              userId: parsedUser.id_usuario,
              type: storedType,
            },
          }
        );
        setProposals(response.data);
      } catch (error) {
        console.error("Erro ao buscar propostas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
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

  const handleAcceptDecline = async (id, status) => {
    try {
      await axios.put(`http://localhost:3000/auth/contracts/${id}`, { status });
      alert(`Proposta ${status}!`);
      setProposals(
        proposals.map((p) => (p.id_contrato === id ? { ...p, status } : p))
      );
    } catch (error) {
      alert("Erro ao atualizar status.");
    }
  };

  if (!user) return null;

  const userType = localStorage.getItem("type");
  const isArtist = userType === "artista";
  const sectionTitle = isArtist ? "Propostas Recebidas" : "Propostas Enviadas";

  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
      <Sidebar
        isArtist={isArtist}
        navigate={navigate}
        handleLogout={handleLogout}
      />

      <main className="flex-1 flex flex-col relative overflow-y-auto scrollbar-hide">
        <Header
          user={user}
          userType={userType}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />

        <div className="p-8">
          <DashboardBanner isArtist={isArtist} navigate={navigate} />

          {/* LISTA DE PROPOSTAS */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                {sectionTitle}
                <span className="text-xs font-normal bg-pink-500/10 text-pink-500 px-2 py-1 rounded-full border border-pink-500/20">
                  {proposals.length} Total
                </span>
              </h2>
            </div>

            {loading ? (
              <div className="text-zinc-500">Carregando...</div>
            ) : proposals.length === 0 ? (
              <div className="text-center py-20 bg-zinc-900/20 rounded-2xl border border-zinc-800 border-dashed">
                <p className="text-zinc-400 mb-4">
                  Nenhuma proposta encontrada.
                </p>
                {isArtist ? (
                  <p className="text-sm text-zinc-500">
                    Mantenha seu perfil atualizado para receber ofertas.
                  </p>
                ) : (
                  <button
                    onClick={() => navigate("/explore")}
                    className="text-yellow-300 hover:underline"
                  >
                    Explorar Artistas e Enviar Propostas
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {proposals.map((item) => (
                  <ProposalCard
                    key={item.id_contrato}
                    item={item}
                    isArtist={isArtist}
                    onAcceptDecline={handleAcceptDecline}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
