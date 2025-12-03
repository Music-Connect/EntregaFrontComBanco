import { useState } from "react";
import axios from "axios";
import Center from "../components/layout/Center";
import Input from "../components/layout/Input";
import Title from "../components/layout/Title";
import { useNavigate } from "react-router";

function ResgisterArt() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmarSenha: "",
    usuario: "",
    telefone: "",
    local: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/registerArt",
        formData
      );
      alert("Sucesso: " + response.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      /* setFormData({
        email: "", password: "", confirmarSenha: "", usuario: "", telefone: "", local: ""
      }); */
    } catch (error) {
      console.error(error);
      alert(
        "Erro: " +
          (error.response?.data?.error || "Erro ao conectar com o servidor")
      );
    }
  };

  return (
    <Center>
      <Title title={"Cadastrar Artista"} />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl flex flex-col gap-5"
      >
        <Input
          label="Coloque seu email:"
          id="email"
          name="email"
          type="email"
          description="example@mail.com"
          value={formData.email}
          onChange={handleChange}
        />

        <Input
          label="Coloque sua senha:"
          id="password"
          name="password"
          type="password"
          description="********"
          value={formData.password}
          onChange={handleChange}
        />

        <Input
          label="Confirme a senha:"
          id="confirmarSenha"
          name="confirmarSenha"
          type="password"
          description="********"
          value={formData.confirmarSenha}
          onChange={handleChange}
        />

        <Input
          label="Usuario:"
          id="usuario"
          name="usuario"
          type="text"
          description="Seu nome artístico"
          value={formData.usuario}
          onChange={handleChange}
        />

        <Input
          label="Telefone de contato:"
          id="telefone"
          name="telefone"
          type="tel"
          description="## #####-####"
          value={formData.telefone}
          onChange={handleChange}
        />

        <Input
          label="Localização:"
          id="local"
          name="local"
          type="text"
          description="Cidade - UF"
          value={formData.local}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full mt-6 bg-linear-to-r from-yellow-300 to-pink-400 text-black font-bold py-3 
          rounded-full hover:opacity-50 transition text-2xl"
        >
          Registrar
        </button>
      </form>
    </Center>
  );
}

export default ResgisterArt;
