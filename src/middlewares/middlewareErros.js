import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js"
import Erro404 from "../erros/Erro404.js";
import ErroBadRequest from "../erros/ErroBadRequest.js";
import ErroValidacao from "../erros/ErroValidacao.js";

function middlewareErros(erro, req, res, next){
    console.error(erro);
    console.log("\n\n-----\n\n");

    if(erro instanceof mongoose.Error.CastError){
        new ErroBadRequest().enviarResposta(res);
    }else if(erro instanceof mongoose.Error.ValidationError || erro instanceof ErroValidacao){
        new ErroValidacao(erro).enviarResposta(res);
    }else if(erro instanceof ErroBase){
        erro.enviarResposta(res);
    }else{
        new ErroBase().enviarResposta(res);
    }
}

export default middlewareErros;