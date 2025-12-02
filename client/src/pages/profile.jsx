import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

// --- DADOS MOCKADOS ---
const mockPosts = [
  {
    id: 1,
    type: "image",
    title: "Show no Ibirapuera",
    likes: 120,
    comments: 45,
    image: "bg-purple-900",
  },
  {
    id: 2,
    type: "video",
    title: "Bastidores Gravação",
    likes: 85,
    comments: 12,
    image: "bg-blue-900",
  },
  {
    id: 3,
    type: "image",
    title: "Novo Setup de Luz",
    likes: 230,
    comments: 55,
    image: "bg-pink-900",
  },
  {
    id: 4,
    type: "image",
    title: "Agenda Aberta!",
    likes: 45,
    comments: 2,
    image: "bg-yellow-700",
  },
  {
    id: 5,
    type: "image",
    title: "Ensaio Fotográfico",
    likes: 310,
    comments: 89,
    image: "bg-green-900",
  },
  {
    id: 6,
    type: "video",
    title: "Solo de Guitarra",
    likes: 500,
    comments: 120,
    image: "bg-red-900",
  },
];

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar o Pop-up
  const [activeTab, setActiveTab] = useState("publicacoes");

  const [editForm, setEditForm] = useState({
    usuario: "",
    telefone: "",
    local_atuacao: "",
    descricao: "",
    organizacao: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    setEditForm({
      usuario: parsedUser.usuario || "",
      telefone: parsedUser.telefone || "",
      local_atuacao: parsedUser.local_atuacao || "",
      descricao: parsedUser.descricao || "",
      organizacao: parsedUser.organizacao || "",
    });
  }, [navigate]);

  if (!user) return null;

  const isArtist = localStorage.getItem("type") === "artista";

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // Atualiza no Backend
      const response = await axios.put(
        `http://localhost:3000/auth/users/${user.id_usuario}`,
        editForm
      );

      // Atualiza no LocalStorage e na Tela
      const updatedUser = { ...user, ...editForm };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false); // Fecha o Pop-up

      alert("Sucesso: " + response.data.message);
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert(
        "Erro: " + (error.response?.data?.error || "Falha ao atualizar perfil.")
      );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden relative">
      {/* --- BOTÃO VOLTAR --- */}
      <button
        onClick={() => navigate("/dashboard")}
        className="fixed top-6 left-6 z-40 bg-black/50 backdrop-blur-md border border-white/10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all"
      >
        ←
      </button>

      <div className="relative">
        <div className="h-80 w-full bg-linear-to-r from-zinc-900 via-purple-900/40 to-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-black to-transparent"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-10 relative -mt-20 flex flex-col md:flex-row items-end gap-8 pb-8 border-b border-zinc-800">
          {/* Foto de Perfil */}
          <div
            className="w-40 h-40 rounded-full p-1 bg-linear-to-tr from-yellow-300 to-pink-500 shadow-2xl relative z-10 group cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center text-4xl font-bold text-white border-4 border-black overflow-hidden relative">
              {user.usuario.substring(0, 2).toUpperCase()}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-xs font-bold">
                EDITAR
              </div>
            </div>
          </div>

          {/* Texto e Ações */}
          <div className="flex-1 mb-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-4xl font-black text-white mb-1">
                  {user.usuario}
                </h1>
                <p className="text-zinc-400 text-sm flex items-center gap-2">
                  {isArtist ? "🎵 Artista Verificado" : "🏢 Contratante"}
                  <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
                  {user.local_atuacao || "Sem localização"}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 rounded-full bg-white text-black font-bold text-sm hover:bg-zinc-200 transition shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                >
                  Editar Perfil
                </button>
                <button className="px-4 py-2 rounded-full border border-zinc-700 hover:border-pink-500 hover:text-pink-500 transition text-zinc-300">
                  ⚙️
                </button>
              </div>
            </div>

            <div className="flex gap-8 mt-6">
              <div className="text-center md:text-left">
                <span className="block font-bold text-white text-lg">1.2k</span>
                <span className="text-xs text-zinc-500 uppercase tracking-wider">
                  Seguidores
                </span>
              </div>
              <div className="text-center md:text-left">
                <span className="block font-bold text-white text-lg">
                  {mockPosts.length}
                </span>
                <span className="text-xs text-zinc-500 uppercase tracking-wider">
                  Publicações
                </span>
              </div>
              <div className="text-center md:text-left">
                <span className="block font-bold text-white text-lg">4.9</span>
                <span className="text-xs text-zinc-500 uppercase tracking-wider">
                  Avaliação
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-8 grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* COLUNA ESQUERDA */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl backdrop-blur-sm">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              Sobre
              <span className="h-px flex-1 bg-zinc-800"></span>
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6 whitespace-pre-line">
              {user.descricao || "Olá! Adicione uma descrição ao seu perfil."}
            </p>

            <div className="space-y-3">
              <InfoItem icon="📧" label="Email" value={user.email} />
              <InfoItem
                icon="📱"
                label="Telefone"
                value={user.telefone || "-"}
              />
              {!isArtist && (
                <InfoItem
                  icon="🏢"
                  label="Empresa"
                  value={user.organizacao || "-"}
                />
              )}
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA */}
        <div className="lg:col-span-3">
          <div className="flex items-center gap-8 border-b border-zinc-800 mb-8">
            <TabButton
              active={activeTab === "publicacoes"}
              onClick={() => setActiveTab("publicacoes")}
            >
              Publicações
            </TabButton>
            <TabButton
              active={activeTab === "agenda"}
              onClick={() => setActiveTab("agenda")}
            >
              Agenda
            </TabButton>
            <TabButton
              active={activeTab === "avaliacoes"}
              onClick={() => setActiveTab("avaliacoes")}
            >
              Avaliações
            </TabButton>
          </div>

          {activeTab === "publicacoes" && (
            <div className="animate-fade-in">
              <div className="mb-8 p-6 rounded-2xl border-2 border-dashed border-zinc-800 flex flex-col items-center justify-center text-zinc-500 hover:border-zinc-600 hover:bg-zinc-900/30 transition cursor-pointer group">
                <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition">
                  +
                </div>
                <p className="text-sm font-medium">Criar nova publicação</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockPosts.map((post) => (
                  <div
                    key={post.id}
                    className="group relative aspect-square bg-zinc-900 rounded-xl overflow-hidden cursor-pointer border border-zinc-800 hover:border-zinc-600 transition"
                  >
                    <div
                      className={`w-full h-full ${post.image} opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500`}
                    ></div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2">
                      <p className="font-bold text-sm px-4 text-center">
                        {post.title}
                      </p>
                      <div className="flex gap-4 text-xs font-bold">
                        <span>❤️ {post.likes}</span>
                        <span>💬 {post.comments}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- POP-UP (MODAL) DE EDIÇÃO --- */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
            {/* Cabeçalho do Modal */}
            <div className="flex justify-between items-center p-6 border-b border-zinc-800">
              <h2 className="text-xl font-bold text-white">Editar Perfil</h2>
              <button
                onClick={() => setIsEditing(false)}
                className="text-zinc-500 hover:text-white transition"
              >
                ✕
              </button>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase mb-1 block">
                  Nome de Usuário
                </label>
                <input
                  className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-pink-500 outline-none transition"
                  value={editForm.usuario}
                  onChange={(e) =>
                    setEditForm({ ...editForm, usuario: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase mb-1 block">
                    Telefone
                  </label>
                  <input
                    className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-pink-500 outline-none transition"
                    value={editForm.telefone}
                    onChange={(e) =>
                      setEditForm({ ...editForm, telefone: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase mb-1 block">
                    Localização
                  </label>
                  <input
                    className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-pink-500 outline-none transition"
                    value={editForm.local_atuacao}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        local_atuacao: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {!isArtist && (
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase mb-1 block">
                    Organização
                  </label>
                  <input
                    className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-pink-500 outline-none transition"
                    value={editForm.organizacao}
                    onChange={(e) =>
                      setEditForm({ ...editForm, organizacao: e.target.value })
                    }
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase mb-1 block">
                  Bio / Sobre
                </label>
                <textarea
                  rows="4"
                  className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-pink-500 outline-none transition resize-none"
                  value={editForm.descricao}
                  onChange={(e) =>
                    setEditForm({ ...editForm, descricao: e.target.value })
                  }
                  placeholder="Conte um pouco sobre você..."
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-3 rounded-xl border border-zinc-700 text-zinc-300 font-bold hover:bg-zinc-800 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-linear-to-r from-yellow-300 to-pink-500 text-black font-bold hover:opacity-90 transition shadow-lg"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Componentes Auxiliares ---
function InfoItem({ icon, label, value, isLink }) {
  return (
    <div className="flex items-start gap-3 p-2 hover:bg-zinc-800/50 rounded-lg transition overflow-hidden">
      <div className="w-8 h-8 rounded-md bg-zinc-800 flex items-center justify-center text-zinc-400 shrink-0">
        {icon}
      </div>
      <div className="overflow-hidden">
        <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">
          {label}
        </p>
        {isLink ? (
          <a
            href="#"
            className="text-sm text-yellow-300 hover:underline truncate block"
          >
            {value}
          </a>
        ) : (
          <p className="text-sm text-zinc-300 truncate">{value}</p>
        )}
      </div>
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-xs text-zinc-400 hover:text-white hover:border-pink-500 transition cursor-default">
      {children}
    </span>
  );
}

function TabButton({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`pb-4 text-sm font-bold border-b-2 transition-all ${
        active
          ? "border-pink-500 text-white"
          : "border-transparent text-zinc-500 hover:text-zinc-300"
      }`}
    >
      {children}
    </button>
  );
}

export default Profile;
