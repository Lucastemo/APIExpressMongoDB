import express from "express";
import AutoresController from "../controllers/autoresController.js";

const routes = express.Router();

routes.get("/autores", AutoresController.listarAutores);
routes.get("/autores/:id", AutoresController.listarAutorPorId);
routes.post("/autores/", AutoresController.adicionarAutor);
routes.put("/autores/:id", AutoresController.atualizarAutor);
routes.delete("/autores/:id", AutoresController.deletarAutor);

export default routes;