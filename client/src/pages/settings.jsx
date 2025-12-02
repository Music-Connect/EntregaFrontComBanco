import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function Settings() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("account");

  const [form, setForm] = useState({
    usuario: "",
    email: "",
    telefone: "",
    local: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
    } else {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setForm({
        usuario: parsed.usuario || "",
        email: parsed.email || "",
        telefone: parsed.telefone || "",
        local: parsed.local_atuacao || "",
      });
    }
  }, [navigate]);

  const handleDeleteAccount = async () => {
    if (confirm("Tem certeza? Essa ação é irreversível.")) {
      try {
        await axios.delete(
          `http://localhost:3000/auth/users/${user.id_usuario}`
        );
        localStorage.clear();
        navigate("/login");
      } catch (error) {
        alert("Erro ao deletar conta.");
      }
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/auth/users/${user.id_usuario}`, {
        ...form,
        local_atuacao: form.local,
      });
      const updated = { ...user, ...form, local_atuacao: form.local };
      localStorage.setItem("user", JSON.stringify(updated));
      setUser(updated);
      alert("Configurações salvas!");
    } catch (error) {
      alert("Erro ao salvar.");
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black text-white font-sans flex">
      {/* --- SIDEBAR CONFIG --- */}
      <aside className="w-64 border-r border-zinc-900 p-8 hidden md:block">
        <div
          className="mb-10 cursor-pointer flex items-center gap-2 text-zinc-400 hover:text-white transition"
          onClick={() => navigate("/dashboard")}
        >
          <span>←</span> Voltar
        </div>

        <h1 className="text-2xl font-bold mb-8">Configurações</h1>

        <nav className="space-y-2">
          <SettingsTab
            label="Conta"
            active={activeTab === "account"}
            onClick={() => setActiveTab("account")}
          />
          <SettingsTab
            label="Segurança"
            active={activeTab === "security"}
            onClick={() => setActiveTab("security")}
          />
          <SettingsTab
            label="Notificações"
            active={activeTab === "notifications"}
            onClick={() => setActiveTab("notifications")}
          />
          <SettingsTab
            label="Integrações"
            active={activeTab === "integrations"}
            onClick={() => setActiveTab("integrations")}
          />
        </nav>
      </aside>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <main className="flex-1 p-8 md:p-12 max-w-4xl">
        {/* HEADER MOBILE */}
        <div className="md:hidden mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-zinc-400"
          >
            ← Voltar
          </button>
          <h1 className="text-2xl font-bold mt-2">Configurações</h1>
        </div>

        {activeTab === "account" && (
          <div className="space-y-10 animate-fade-in">
            {/* Seção de Perfil */}
            <section>
              <h2 className="text-xl font-bold mb-6 pb-4 border-b border-zinc-900">
                Informações Pessoais
              </h2>

              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-300 to-pink-500 p-[2px]">
                  <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center font-bold text-2xl">
                    {user.usuario.substring(0, 2).toUpperCase()}
                  </div>
                </div>
                <div>
                  <button className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-zinc-200 transition mr-3">
                    Alterar Foto
                  </button>
                  <button className="text-red-500 text-sm font-bold hover:underline">
                    Remover
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup
                  label="Nome de Usuário"
                  value={form.usuario}
                  onChange={(e) =>
                    setForm({ ...form, usuario: e.target.value })
                  }
                />
                <InputGroup label="Email" value={form.email} disabled />
                <InputGroup
                  label="Telefone"
                  value={form.telefone}
                  onChange={(e) =>
                    setForm({ ...form, telefone: e.target.value })
                  }
                />
                <InputGroup
                  label="Localização"
                  value={form.local}
                  onChange={(e) => setForm({ ...form, local: e.target.value })}
                />
              </div>
            </section>

            {/* Seção de Perigo */}
            <section className="pt-6">
              <h2 className="text-xl font-bold mb-4 text-red-500">
                Zona de Perigo
              </h2>
              <div className="bg-red-900/10 border border-red-900/30 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h3 className="font-bold text-white">Deletar Conta</h3>
                  <p className="text-sm text-zinc-400">
                    Ao deletar sua conta, todos os seus dados serão perdidos
                    permanentemente.
                  </p>
                </div>
                <button
                  onClick={handleDeleteAccount}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition whitespace-nowrap"
                >
                  Deletar Minha Conta
                </button>
              </div>
            </section>

            {/* Botão Salvar Flutuante */}
            <div className="fixed bottom-8 right-8">
              <button
                onClick={handleUpdate}
                className="bg-gradient-to-r from-yellow-300 to-pink-500 text-black px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition transform"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        )}

        {/* Placeholder para outras abas */}
        {activeTab !== "account" && (
          <div className="text-center py-20 text-zinc-500">
            <p>Configurações de {activeTab} em desenvolvimento.</p>
          </div>
        )}
      </main>
    </div>
  );
}

// --- Componentes Auxiliares ---

function SettingsTab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition ${
        active
          ? "bg-zinc-900 text-white"
          : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
      }`}
    >
      {label}
    </button>
  );
}

function InputGroup({ label, value, onChange, disabled }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-pink-500 transition ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
}

export default Settings;
