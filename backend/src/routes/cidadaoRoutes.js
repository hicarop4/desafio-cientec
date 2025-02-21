import CidadaoController from "../controllers/cidadaoController.js";
const cidadaoController = new CidadaoController();

const routes = {
  "/api/v1/cidadaos:get": cidadaoController.getCidadao,
  "/api/v1/cidadaos/create:post": cidadaoController.createCidadao,
};

export default routes;
