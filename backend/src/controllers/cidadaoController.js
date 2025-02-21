import url from "url";
import CidadaoService from "../services/cidadaoService.js";
const cidadaoService = new CidadaoService();

class CidadaoController {
  // Método para buscar cidadãos
  async getCidadao(req, res) {
    const { id, cpf, nome } = url.parse(req.url, true).query;

    // Tenta buscar os cidadãos de acordo com o parâmetro passado
    // Priorizando id, depois cpf, depois name e em último caso retorna todos
    let cidadaos;
    try {
      cidadaos = id
        ? await cidadaoService.findById(id)
        : cpf
        ? await cidadaoService.findByCpf(cpf)
        : nome
        ? await cidadaoService.findByName(nome)
        : await cidadaoService.findAll();
    } catch (error) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ error: error.message }));
    }

    if (!cidadaos) {
      res.statusCode = 404;
      return res.end(JSON.stringify({ error: "Cidadão não encontrado" }));
    }
    res.end(JSON.stringify(cidadaos));
  }

  // Método para registrar um novo cidadão
  async createCidadao(req, res) {
    let body = "";

    // Conforme for recebendo dados, vai concatenando na variável body
    req.on("data", (chunk) => {
      body += chunk;
    });

    // Quando terminar de receber os dados, tenta criar o cidadão
    req.on("end", async () => {
      try {
        const cidadao = JSON.parse(body); // Assume que os dados vêm como JSON

        // Chama o serviço para criar um cidadão no banco de dados
        const newCidadao = await cidadaoService.create(cidadao);

        res.statusCode = 201; // Código HTTP para recurso criado com sucesso
        res.end(
          JSON.stringify({
            message: "Cidadão registrado com sucesso!",
            cidadao: newCidadao,
          })
        );
      } catch (error) {
        res.statusCode = 400;
        res.write(JSON.stringify({ error: error.message }));
        res.end();
      }
    });
  }
}

export default CidadaoController;
