import CidadaoRepository from "../repositories/cidadaoRepository.js";
const cidadaoRepository = new CidadaoRepository();

class CidadaoService {
  // Método para validar os dados, criar um cidadão e salvar no banco de dados
  async create({ nome, cpf }) {
    if (!nome || !cpf) throw new Error("Nome e CPF são obrigatórios");
    if (cpf.length !== 11) throw new Error("CPF deve ter 11 dígitos");
    // Se o CPF não for um número, lança um erro
    if (isNaN(cpf)) throw new Error("CPF deve conter apenas números");

    const cidadaoExistente = await cidadaoRepository.getCidadaoByCpf(cpf);
    if (cidadaoExistente.length) throw new Error("CPF já cadastrado");

    const novoCidadao = await cidadaoRepository.createCidadao(nome, cpf);
    return novoCidadao;
  }

  async findByCpf(cpf) {
    return await cidadaoRepository.getCidadaoByCpf(cpf);
  }

  async findByName(name) {
    return await cidadaoRepository.getCidadaosByName(name);
  }

  async findById(id) {
    if (isNaN(id)) throw new Error("ID deve ser um número");
    return await cidadaoRepository.getCidadaoById(id);
  }

  async findAll() {
    return await cidadaoRepository.getAllCidadaos();
  }
}

export default CidadaoService;
