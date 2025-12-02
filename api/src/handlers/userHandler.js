import pool from "../config/mysql.js";

function RegisterDataValidator({ email, password, confirmarSenha, usuario }) {
  if (!email) throw new Error("O email é obrigatório.");
  if (!usuario) throw new Error("O nome de usuário é obrigatório.");
  if (password !== confirmarSenha) throw new Error("As senhas não conferem.");
}

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

    RegisterDataValidator({ email, password, confirmarSenha, usuario });

    // 1. Inserir na tabela USUARIO
    const queryUser = `
            INSERT INTO usuario (email, senha, usuario, telefone, local_atuacao, tipo_usuario) 
            VALUES (?, ?, ?, ?, ?, 'contratante')
        `;

    pool.query(
      queryUser,
      [email, password, usuario, telefone, local],
      (err, resultUser) => {
        if (err)
          return response
            .status(500)
            .json({ error: "Erro ao criar usuário: " + err.message });

        const newUserId = resultUser.insertId;

        // 2. Inserir na tabela CONTRATANTE
        const queryCon = `INSERT INTO contratante (id_usuario, organizacao) VALUES (?, ?)`;

        pool.query(queryCon, [newUserId, organizacao], (errCon, resultCon) => {
          if (errCon) {
            return response
              .status(500)
              .json({ error: "Erro ao criar dados de contratante." });
          }

          // 3. RETORNO COMPLETO (A Correção é Aqui)
          // Montamos o objeto usuário manualmente para devolver ao Front
          const newUser = {
            id_usuario: newUserId,
            email,
            usuario,
            telefone,
            local_atuacao: local,
            tipo_usuario: "contratante",
            organizacao: organizacao, // <--- Agora enviamos a organização!
          };

          return response.status(201).json({
            message: "Contratante cadastrado com sucesso!",
            user: newUser, // Enviamos o user para o front já logar se quiser
          });
        });
      }
    );
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
}

export function dataReturnArt(request, response) {
  try {
    const { email, password, confirmarSenha, usuario, telefone, local } =
      request.body;

    RegisterDataValidator({ email, password, confirmarSenha, usuario });

    const query = `
            INSERT INTO usuario (email, senha, usuario, telefone, local_atuacao, tipo_usuario) 
            VALUES (?, ?, ?, ?, ?, 'artista')
        `;

    pool.query(
      query,
      [email, password, usuario, telefone, local],
      (err, results) => {
        if (err)
          return response
            .status(500)
            .json({ error: "Erro ao criar artista: " + err.message });

        return response.status(201).json({
          message: "Artista cadastrado com sucesso!",
          id: results.insertId,
        });
      }
    );
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
}

export function userLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  const query = `
        SELECT u.*, c.organizacao 
        FROM usuario u
        LEFT JOIN contratante c ON u.id_usuario = c.id_usuario
        WHERE u.email = ? AND u.senha = ?
    `;

  pool.query(query, [email, password], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length > 0) {
      const user = results[0];
      return res.status(200).json({
        message: "Login realizado com sucesso!",
        user: user,
        type: user.tipo_usuario,
      });
    }

    return res.status(401).json({ error: "Email ou senha incorretos." });
  });
}
export function updateUser(req, res) {
  const { id } = req.params;
  const { usuario, telefone, local_atuacao, descricao, organizacao } = req.body;

  const queryUser = `
        UPDATE usuario 
        SET usuario = ?, telefone = ?, local_atuacao = ?, descricao = ?
        WHERE id_usuario = ?
    `;

  pool.query(
    queryUser,
    [usuario, telefone, local_atuacao, descricao, id],
    (err, result) => {
      if (err) {
        console.error("Erro ao atualizar usuario:", err);
        return res
          .status(500)
          .json({ error: "Erro ao atualizar dados básicos." });
      }

      if (organizacao) {
        const queryCon = `UPDATE contratante SET organizacao = ? WHERE id_usuario = ?`;
        pool.query(queryCon, [organizacao, id], (errCon) => {
          if (errCon) console.error("Erro ao atualizar organização:", errCon);
        });
      }

      return res.status(200).json({
        message: "Perfil atualizado com sucesso!",

        user: { ...req.body, id_usuario: id },
      });
    }
  );
}

export function getUsers(req, res) {
  const { type, search } = req.query;

  // CORREÇÃO AQUI: Mudamos 'id_usuario' para 'usuario.id_usuario' para evitar ambiguidade
  let query = `
        SELECT usuario.id_usuario, usuario, local_atuacao, imagem_perfil_url, descricao, tipo_usuario, organizacao 
        FROM usuario 
        LEFT JOIN contratante ON usuario.id_usuario = contratante.id_usuario 
        WHERE 1=1
    `;

  const params = [];

  if (type) {
    query += " AND tipo_usuario = ?";
    params.push(type);
  }

  if (search) {
    query += " AND (usuario LIKE ? OR descricao LIKE ?)";
    params.push(`%${search}%`, `%${search}%`);
  }

  pool.query(query, params, (err, results) => {
    if (err) {
      console.error("Erro na busca:", err); // Agora você verá o erro no terminal se acontecer de novo
      return res.status(500).json({ error: "Erro ao buscar usuários." });
    }
    return res.status(200).json(results);
  });
}

export function deleteUser(req, res) {
  const { id } = req.params;

  const query = "DELETE FROM usuario WHERE id_usuario = ?";

  pool.query(query, [id], (err, result) => {
    if (err) {
      console.error("Erro ao deletar usuário:", err);
      return res.status(500).json({ error: "Erro ao excluir conta." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    return res.status(200).json({ message: "Conta excluída com sucesso!" });
  });
}
