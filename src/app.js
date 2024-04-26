import express from "express";
import conectaNaDatabase from "../config/dbConnect.js";
import routes from "./routes/index.js";
import middlewareErros from "./middlewares/middlewareErros.js";
import PaginaNaoEncontrada404 from "./middlewares/middlewareErro404.js";

const conexao = await conectaNaDatabase()

conexao.on("error", erro => {
    console.error("Ocorreu um erro ao tentar se conectar com o banco de dados:", erro);
});

conexao.once("open", () =>{
    console.log("Conexão com o banco de dados feita com sucesso!");
});

const app = express();

routes(app);

app.use(PaginaNaoEncontrada404);

app.use(middlewareErros);

export default app;