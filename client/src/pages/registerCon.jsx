import { useState } from "react";
import axios from "axios";
import Center from "../components/layout/Center";
import Input from "../components/layout/Input";
import Title from "../components/layout/Title";

function ResgisterCon() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmarSenha: "",
    usuario: "",
    telefone: "",
    local: "",
    organizacao: "",
  });

  // 1. Função para atualizar o estado quando você digita
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. Função para enviar os dados quando clica no botão
  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede a página de recarregar

    if (formData.password !== formData.confirmarSenha) {
      return alert("As senhas não conferem!");
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/registerCon",
        formData
      );
      alert("Sucesso: " + response.data.message);
    } catch (error) {
      console.error(error);
      alert("Erro: " + (error.response?.data?.error || "Erro de conexão"));
    }
  };

  return (
    <Center>
      <Title title={"Cadastrar Contratante"} />
      {/* O onSubmit precisa estar aqui na tag form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl flex flex-col gap-5"
      >
        <Input
          label="Email:"
          id="email"
          name="email"
          type="email"
          description="email@teste.com"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          label="Senha:"
          id="password"
          name="password"
          type="password"
          description="***"
          value={formData.password}
          onChange={handleChange}
        />
        <Input
          label="Confirme Senha:"
          id="confirmarSenha"
          name="confirmarSenha"
          type="password"
          description="***"
          value={formData.confirmarSenha}
          onChange={handleChange}
        />
        <Input
          label="Usuário:"
          id="usuario"
          name="usuario"
          type="text"
          description="User"
          value={formData.usuario}
          onChange={handleChange}
        />
        <Input
          label="Telefone:"
          id="telefone"
          name="telefone"
          type="tel"
          description="11999..."
          value={formData.telefone}
          onChange={handleChange}
        />
        <Input
          label="Local:"
          id="local"
          name="local"
          type="text"
          description="SP"
          value={formData.local}
          onChange={handleChange}
        />
        <Input
          label="Organização:"
          id="organizacao"
          name="organizacao"
          type="text"
          description="Empresa"
          value={formData.organizacao}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full mt-6 bg-linear-to-r from-yellow-300 to-pink-400 text-black font-bold py-3 rounded-full hover:opacity-50 transition text-2xl"
        >
          Registrar
        </button>
      </form>
    </Center>
  );
}

export default ResgisterCon;
