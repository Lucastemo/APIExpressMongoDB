import express from "express";
import { livro, autor } from "../models/index.js";
import Erro404 from "../erros/Erro404.js";
import ErroValidacao from "../erros/ErroValidacao.js";
import ErroBadRequest from "../erros/ErroBadRequest.js";

class LivroController {
    static async listarLivros(req, res, next){
        try{
            const listaLivros = livro.find({}).populate("autor");
            req.resultado = listaLivros;
            next();
        }catch(erro){
            next(erro);
        }
    }

    static async listarLivroPorId(req, res, next){
        try {
            const livroEncontrado = await livro.findById(req.params.id).populate("autor").exec();
            if(livroEncontrado === null){
                next(new Erro404("Livro não encontrado"));
                return;
            }
            res.status(200).json(livroEncontrado);
        } catch (erro) {
            next(erro);
        }
    }

    static async adicionarLivro(req, res, next){
        const infoLivro = req.body;
        try {
            const autores = await autor.findById(infoLivro.autor);
            if(autores === null){
                next(new Erro404("Autor não encontrado"));
                return;
            }
            const livroCriado = await livro.create(infoLivro);
            livroCriado.autor = autores;
            res.status(201).json({ mensagem: "Livro adicionado com sucesso", livro: livroCriado });
        } catch (erro) {
            next(erro);
        }
    }

    static async atualizarLivro(req, res, next){
        try {
            const livroEncontrado = await livro.findByIdAndUpdate(req.params.id, req.body);
            if(livroEncontrado === null){
                next(new Erro404("Livro não encontrado"));
                return;
            }
            res.status(200).json({ mensagem: "Livro Atualizado com Sucesso" });
        } catch (erro) {
            next(erro);
        }
    }

    static async deletarLivro(req, res, next){
        try {
            const livroEncontrado = await livro.findByIdAndDelete(req.params.id);
            if(livroEncontrado === null){
                next(new Erro404("Livro não encontrado"));
                return;
            }
            res.status(200).json({ mensagem: "Livro Deletado com Sucesso" });
        } catch (erro) {
            next(erro);
        }
    }

    static async buscarLivrosPorFiltro(req, res, next){
        try {
            const busca = await configurarBusca(req.query);

            if(busca !== null){
                const livrosEncontrados = livro.find(busca).populate("autor");
                req.resultado = livrosEncontrados;
                next();
            }else{
                res.status(200).json([]);
            }
        } catch (erro) {
            next(erro);
        }
    }
}

async function configurarBusca({ editora, titulo, minpaginas, maxpaginas, nomeAutor }){
    const busca = {};
    if(editora) busca.editora = editora;
    if(titulo) busca.titulo = { $regex: titulo, $options: "i" };
    if(minpaginas || maxpaginas) {
        busca.paginas = {};
        if(minpaginas) busca.paginas.$gte = minpaginas;
        if(maxpaginas) busca.paginas.$lte = maxpaginas;
    }
    if(nomeAutor){
        const autorEncontrado = await autor.findOne({ nome: nomeAutor });
        if(autorEncontrado !== null){
            busca.autor = autorEncontrado._id;
        }else{
            return null;
        }
    }
    return busca;
}

export default LivroController;