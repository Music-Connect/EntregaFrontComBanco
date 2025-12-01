import mysql from "mysql";
import config from "./config.js";

const pool = mysql.createPool({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  connectionLimit: config.mysql.connectionLimit,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Erro ao conectar no MySQL:", err.message);
  } else {
    console.log("✅ Banco de dados conectado com sucesso!");
    connection.release();
  }
});

export default pool;
