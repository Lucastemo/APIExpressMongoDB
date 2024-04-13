import express from "express";
import livros from "./livroRoutes.js";

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send("Seja bem vindo à API! :D Tente ir para /livros, é bem legal."))

    app.use(express.json(), livros);
}

export default routes;