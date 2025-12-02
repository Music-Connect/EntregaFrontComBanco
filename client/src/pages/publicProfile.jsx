import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

import ProfileHeader from "../components/publicProfile/ProfileHeader";
import ProfileAbout from "../components/publicProfile/ProfileAbout";
import ProfilePortfolio from "../components/publicProfile/ProfilePortfolio";
import ProposalModal from "../components/publicProfile/ProposalModal";

function PublicProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [proposalForm, setProposalForm] = useState({
    evento: "",
    local: "",
    data_evento: "",
    valor: "",
    mensagem: "",
  });

  const storedUser = localStorage.getItem("user");
  const loggedUser = storedUser ? JSON.parse(storedUser) : null;
  const isContractor = localStorage.getItem("type") === "contratante";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/auth/users/${id}`
        );
        setProfileUser(response.data);
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleSendProposal = async (e) => {
    e.preventDefault();
    if (!loggedUser) return alert("Você precisa estar logado!");

    if (!proposalForm.valor || !proposalForm.data_evento) {
      return alert("Preencha o valor e a data!");
    }

    try {
      await axios.post("http://localhost:3000/auth/contracts", {
        local_evento: proposalForm.local,
        data_evento: proposalForm.data_evento,
        valor_servico: parseFloat(proposalForm.valor),
        mensagem: proposalForm.mensagem,
        id_contratante: loggedUser.id_usuario,
        id_usuario: profileUser.id_usuario, // Artista
      });
      alert("Proposta enviada com sucesso!");
      setShowModal(false);
      setProposalForm({
        evento: "",
        local: "",
        data_evento: "",
        valor: "",
        mensagem: "",
      });
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar proposta.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Carregando...
      </div>
    );
  if (!profileUser)
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Usuário não encontrado.
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden relative">
      <button
        onClick={() => navigate(-1)}
        className="fixed top-6 left-6 z-40 bg-black/50 backdrop-blur-md border border-white/10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all"
      >
        ←
      </button>

      <ProfileHeader
        user={profileUser}
        isContractor={isContractor}
        onOpenProposal={() => setShowModal(true)}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1">
          <ProfileAbout user={profileUser} />
        </div>
        <div className="lg:col-span-2">
          <ProfilePortfolio />
        </div>
      </div>

      <ProposalModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSendProposal}
        form={proposalForm}
        onChange={setProposalForm}
        themeColor={profileUser.cor_tema}
      />
    </div>
  );
}

export default PublicProfile;
