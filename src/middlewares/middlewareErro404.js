import Erro404 from "../erros/Erro404.js";

function PaginaNaoEncontrada404(req, res, next){
    new Erro404().enviarResposta(res);
}

export default PaginaNaoEncontrada404;