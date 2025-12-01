import pool from "../config/mysql.js";

export default function dataReturnCon(request, response) {
  try {
    const {
      email,
      password,
      confirmarSenha,
      usuario,
      telefone,
      local,
      organizacao,
    } = request.body;

    const query = `
            INSERT INTO contratantes (email, senha, nome_usuario, telefone, localizacao, organizacao) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
    const values = [email, password, usuario, telefone, local, organizacao];

    pool.query(query, values, (error, results) => {
      if (error) {
        console.error("❌ Erro no MySQL:", error);
        return response
          .status(500)
          .json({ error: "Erro ao salvar no banco." + error.message });
      }

      return response.status(201).json({
        message: "Contratante cadastrado com sucesso!",
        id: results.insertId,
      });
    });
  } catch (error) {
    console.error("❌ Erro de validação:", error.message);
    return response.status(400).json({ error: error.message });
  }
}

export function dataReturnArt(request, response) {
  try {
    console.log("📩 Recebido pedido de registro de Artista:", request.body);

    const { email, password, confirmarSenha, usuario, telefone, local } =
      request.body;

    RegisterDataValidator({ email, password, confirmarSenha, usuario });

    const query = `
            INSERT INTO artistas (email, senha, nome_usuario, telefone, localizacao) 
            VALUES (?, ?, ?, ?, ?)
        `;
    const values = [email, password, usuario, telefone, local];

    pool.query(query, values, (error, results) => {
      if (error) {
        console.error("❌ Erro no MySQL:", error);
        return response.status(500).json({ error: "Erro ao salvar no banco." });
      }

      console.log("✅ Artista salvo! ID:", results.insertId);

      return response.status(201).json({
        message: "Artista cadastrado com sucesso!",
        id: results.insertId,
      });
    });
  } catch (error) {
    console.error("❌ Erro de validação:", error.message);
    return response.status(400).json({ error: error.message });
  }
}

export function userLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  const queryArt = "SELECT * FROM artistas WHERE email = ? AND senha = ?";

  pool.query(queryArt, [email, password], (err, resultsArt) => {
    if (err) return res.status(500).json({ error: err.message });

    if (resultsArt.length > 0) {
      return res.status(200).json({
        message: "Login realizado com sucesso!",
        user: resultsArt[0],
        type: "artista",
      });
    }

    const queryCon = "SELECT * FROM contratantes WHERE email = ? AND senha = ?";

    pool.query(queryCon, [email, password], (err, resultsCon) => {
      if (err) return res.status(500).json({ error: err.message });

      if (resultsCon.length > 0) {
        return res.status(200).json({
          message: "Login realizado com sucesso!",
          user: resultsCon[0],
          type: "contratante",
        });
      }

      return res.status(401).json({ error: "Email ou senha incorretos." });
    });
  });
}
