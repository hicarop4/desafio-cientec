import http from "http";
import routes from "./routes/index.js";
const PORT = 3000;

const handleRequest = (req, res) => {
  const { url, method } = req;
  // Resposta padrão
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Responder a requisições OPTIONS imediatamente
  if (method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  // Formata uma string para o objeto de rotas
  const path = url.split("?")[0];
  const key = `${path}:${method.toLowerCase()}`;
  const route = routes[key] || routes.notFound;

  // Chama a rota adequada
  return route(req, res);
};

http.createServer(handleRequest).listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
