import pool from "../../database/db.js";

class CidadaoRepository {
  // Função para buscar todos os cidadãos
  async getAllCidadaos() {
    const [rows] = await pool.query("SELECT * FROM cidadaos");
    return rows;
  }

  // Função para buscar um cidadão por CPF
  async getCidadaoByCpf(cpf) {
    const [rows] = await pool.query("SELECT * FROM cidadaos WHERE cpf = ?", [
      cpf,
    ]);
    return rows;
  }

  // Função para buscar cidadãos por id
  async getCidadaoById(id) {
    const [rows] = await pool.query("SELECT * FROM cidadaos WHERE id = ?", [
      id,
    ]);

    return rows[0];
  }

  // Função para buscar cidadãos por id
  async getCidadaosByName(name) {
    const [rows] = await pool.query(
      "SELECT * FROM cidadaos WHERE nome LIKE ?",
      [`%${name}%`]
    );

    return rows.length ? rows : null;
  }

  // Função para cadastrar um novo cidadão
  async createCidadao(nome, cpf) {
    const [result] = await pool.query(
      "INSERT INTO cidadaos (nome, cpf) VALUES (?, ?)",
      [nome, cpf]
    );
    return { id: result.insertId, nome, cpf };
  }
}

// Exporta as funções para uso em outros módulos
export default CidadaoRepository;
