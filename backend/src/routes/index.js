import cidadaoRoutes from "./cidadaoRoutes.js";

const routes = {
  ...cidadaoRoutes,

  // Rota padrão para quando não for encontrada nenhuma rota
  notFound: async (req, res) => {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.write(
      JSON.stringify({
        message:
          "This is a empty route. Check documentation for available routes",
      })
    );
    res.end();
  },
};

export default routes;
