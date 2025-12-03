import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import Sidebar from "../components/dashboard/Sidebar";
import ProposalCard from "../components/dashboard/ProposalCard";

export default function Proposals() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Recupera dados do usuário e busca propostas
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

  // Função para aceitar/recusar (Reutilizada)
  const handleAcceptDecline = async (id, status) => {
    try {
      await axios.put(`http://localhost:3000/auth/contracts/${id}`, { status });
      alert(`Proposta ${status}!`);
      // Atualiza a lista localmente
      setProposals(
        proposals.map((p) => (p.id_contrato === id ? { ...p, status } : p))
      );
    } catch (error) {
      alert("Erro ao atualizar status.");
    }
  };

  if (!user) return null;

  const isArtist = localStorage.getItem("type") === "artista";
  const pageTitle = isArtist
    ? "Todas as Propostas"
    : "Histórico de Contratações";

  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
      {/* Passamos 'activePage' para destacar o item correto na Sidebar */}
      <Sidebar
        isArtist={isArtist}
        navigate={navigate}
        handleLogout={handleLogout}
        activePage="proposals"
      />

      <main className="flex-1 flex flex-col relative overflow-y-auto scrollbar-hide p-8">
        <h1 className="text-3xl font-bold mb-8 border-b border-zinc-800 pb-4">
          {pageTitle}
        </h1>

        {loading ? (
          <div className="text-zinc-500">Carregando propostas...</div>
        ) : proposals.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/20 rounded-2xl border border-zinc-800 border-dashed">
            <p className="text-zinc-400">Você ainda não possui propostas.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
      </main>
    </div>
  );
}
