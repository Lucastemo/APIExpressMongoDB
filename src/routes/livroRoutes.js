import express from "express";
import LivroController from "../controllers/livroController.js";
import paginar from "../middlewares/paginacao.js"

const routes = express.Router();

routes.get("/livros", LivroController.listarLivros, paginar);
routes.get("/livros/busca", LivroController.buscarLivrosPorFiltro, paginar);
routes.get("/livros/:id", LivroController.listarLivroPorId);
routes.post("/livros/", LivroController.adicionarLivro);
routes.put("/livros/:id", LivroController.atualizarLivro);
routes.delete("/livros/:id", LivroController.deletarLivro);

export default routes;