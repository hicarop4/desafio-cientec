import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql2";

// Aqui só cria uma pool de conexão com o banco de dados
// e exporta para ser usada em outros arquivos
// A conexão em si é feita em cada rota que precisa acessar o banco
const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  })
  .promise();

export default pool;
