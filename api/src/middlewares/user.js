export function validateRegister(req, res, next) {
  const { email, password, confirmarSenha, usuario } = req.body;

  if (!email) return res.status(400).json({ error: "O email é obrigatório." });
  if (!usuario)
    return res.status(400).json({ error: "O nome de usuário é obrigatório." });
  if (!password)
    return res.status(400).json({ error: "A senha é obrigatória." });
  if (password !== confirmarSenha)
    return res.status(400).json({ error: "As senhas não conferem." });

  next();
}
