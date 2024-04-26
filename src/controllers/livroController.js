import express from "express";
import { livro } from "../models/index.js";
import { autor } from "../models/index.js"
import Erro404 from "../erros/Erro404.js";
import ErroValidacao from "../erros/ErroValidacao.js";

class LivroController {
    static async listarLivros(req, res, next){
        try{
            const listaLivros = await livro.find({}).populate("autor").exec();
            res.status(200).json(listaLivros);
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
            const { editora, titulo, minpaginas, maxpaginas } = req.query;

            const busca = {};
            if(editora) busca.editora = editora;
            if(titulo) busca.titulo = { $regex: titulo, $options: "i" };
            if(minpaginas || maxpaginas) {
                busca.paginas = {};
                if(minpaginas) busca.paginas.$gte = minpaginas;
                if(maxpaginas) busca.paginas.$lte = maxpaginas;
            }

            const livrosEncontrados = await livro.find(busca);
            if(livrosEncontrados.length === 0){
                next(new Erro404("Nenhum livro foi encontrado"));
                return;
            }
            res.status(200).json(livrosEncontrados);
        } catch (erro) {
            next(erro);
        }
    }
}

export default LivroController;