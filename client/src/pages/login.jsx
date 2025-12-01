import { useState } from "react";
import { Link, useNavigate } from "react-router"; // Adicionei useNavigate para redirecionar depois
import axios from "axios";
import Center from "../components/layout/Center";
import Input from "../components/layout/Input";
import Title from "../components/layout/Title";

function Login() {
  const navigate = useNavigate();
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormLogin({ ...formLogin, [e.target.name]: e.target.value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        formLogin
      );
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("type", response.data.type);

      alert("Bem-vindo(a)! " + response.data.message);
      console.log("Dados do usuário:", response.data.user);
      console.log("Tipo de perfil:", response.data.type);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.error || "Erro ao fazer login");
    }
  };

  return (
    <Center>
      <Title title={"Music Connect"} />
      <p className="text-1xl text-zinc-300 pb-10 text-center">
        Conecte-se com artistas, produtores e oportunidades na indústria
        musical.
      </p>

      <form
        className="w-full max-w-xl flex flex-col gap-5"
        onSubmit={loginSubmit}
      >
        <Input
          label="Email:"
          id="email"
          name="email"
          type="email"
          description="example@gmail.com"
          value={formLogin.email}
          onChange={handleChange}
        />
        <Input
          label="Senha:"
          id="password"
          name="password"
          type="password"
          description="*******"
          value={formLogin.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full mt-6 bg-linear-to-r from-yellow-300 to-pink-400 text-black font-bold py-3 
          rounded-full hover:opacity-50 transition text-2xl"
        >
          Entrar
        </button>
      </form>

      <div className="w-full max-w-xl text-center mt-4">
        <Link
          to={"/forgot-password"}
          className="text-amber-400 hover:underline"
        >
          Esqueceu sua senha?
        </Link>
      </div>

      <p className="text-1xl text-zinc-100 mt-2">
        Não tem uma conta?{" "}
        <Link
          to={"/profileSelector"}
          className="text-amber-400 hover:underline"
        >
          Registre-se
        </Link>
      </p>
    </Center>
  );
}

export default Login;
