import express from "express";
import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js"

class LivroController {
    static async listarLivros(req, res){
        try{
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        }catch(erro){
            res.status(500).json({ message: `${erro.message} - Falha ao tentar buscar os dados` });
        }
    }

    static async listarLivroPorId(req, res){
        try {
            const livroEncontrado = await livro.findById(req.params.id);
            res.status(200).json(livroEncontrado);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha ao tentar buscar os dados do livro especificado` });
        }
    }

    static async adicionarLivro(req, res){
        const livroAdicionado = req.body;
        try {
            const autorEncontrado = await autor.findById(livroAdicionado.autor);
            const novoLivro = { ...livroAdicionado, autor: { ...autorEncontrado._doc }};
            await livro.create(novoLivro);
            res.status(201).json({ message: "Livro adicionado com sucesso", livro: novoLivro });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha ao tentar adicionar livro` });
        }
    }

    static async atualizarLivro(req, res){
        try {
            await livro.findByIdAndUpdate(req.params.id, req.body)
            res.status(200).json({ message: "Livro Atualizado com Sucesso" });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha ao tentar atualizar o livro especificado` });
        }
    }

    static async deletarLivro(req, res){
        try {
            await livro.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "Livro Deletado com Sucesso" });
        } catch (erro) {
            res.status(500).json({ message: `${erro} - Falha ao tentar deletar o livro especificado` });
        }
    }

    static async buscarLivrosPorEditora(req, res){
        try {
            const editora = req.query.editora;
            const livrosEncontrados = await livro.find({ editora: editora });
            res.status(200).json(livrosEncontrados);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha ao tentar buscar livros por editora` });
        }
    }
}

export default LivroController;