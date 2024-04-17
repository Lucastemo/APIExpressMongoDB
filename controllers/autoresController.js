import express from "express";
import { autor } from "../models/Autor.js";

class AutoresController {
    static async listarAutores(req, res){
        try{
            const listaAutores = await autor.find({});
            res.status(200).json(listaAutores);
        }catch(erro){
            res.status(500).json({ message: `${erro.message} - Falha ao tentar buscar os dados` });
        }
    }

    static async listarAutorPorId(req, res){
        try {
            const autorEncontrado = await autor.findById(req.params.id);
            res.status(200).json(autorEncontrado);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha ao tentar buscar os dados do autor especificado` });
        }
    }

    static async adicionarAutor(req, res){
        try {
            const autorAdicionado = await autor.create(req.body);
            res.status(201).json({ message: "Autor adicionado com sucesso", autor: autorAdicionado });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha ao tentar adicionar autor` });
        }
    }

    static async atualizarAutor(req, res){
        try {
            await autor.findByIdAndUpdate(req.params.id, req.body)
            res.status(200).json({ message: "Autor Atualizado com Sucesso" });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha ao tentar atualizar o autor especificado` });
        }
    }

    static async deletarAutor(req, res){
        try {
            await autor.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "Autor Deletado com Sucesso" });
        } catch (erro) {
            res.status(500).json({ message: `${erro} - Falha ao tentar deletar o autor especificado` });
        }
    }
}

export default AutoresController;