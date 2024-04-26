import express from "express";
import { autor } from "../models/Autor.js";
import Erro404 from "../erros/Erro404.js";

class AutoresController {
    static async listarAutores(req, res, next){
        try{
            const listaAutores = await autor.find({});
            res.status(200).json(listaAutores);
        }catch(erro){
            next(erro);
        }
    }

    static async listarAutorPorId(req, res, next){
        try {
            const autorEncontrado = await autor.findById(req.params.id);
            if(autorEncontrado === null){
                next(new Erro404("Autor não encontrado"));
                return;
            }
            res.status(200).json(autorEncontrado);
        } catch (erro) {
            next(erro);
        }
    }

    static async adicionarAutor(req, res, next){
        try {
            const autorAdicionado = await autor.create(req.body);
            res.status(201).json({ message: "Autor adicionado com sucesso", autor: autorAdicionado });
        } catch (erro) {
            next(erro);
        }
    }

    static async atualizarAutor(req, res, next){
        try {
            const autorEncontrado = await autor.findByIdAndUpdate(req.params.id, req.body)
            if(autorEncontrado === null){
                next(new Erro404("Autor não encontrado"))
                return;
            }
            res.status(200).json({ message: "Autor Atualizado com Sucesso" });
        } catch (erro) {
            next(erro);
        }
    }

    static async deletarAutor(req, res, next){
        try {
            const autorEncontrado = await autor.findByIdAndDelete(req.params.id);
            if(autorEncontrado === null){
                next(new Erro404("Autor não encontrado"));
                return;
            }
            res.status(200).json({ message: "Autor Deletado com Sucesso" });
        } catch (erro) {
            next(erro);
        }
    }
}

export default AutoresController;