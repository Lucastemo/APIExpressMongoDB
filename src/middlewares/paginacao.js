import ErroBadRequest from "../erros/ErroBadRequest.js";

async function paginar(req, res, next){
    try {
        let { limite = 5, pagina = 1, ordenacao = "_id:-1" } = req.query;
        let [campoOrdenado, ordem] = ordenacao.split(":");
        ordem = parseInt(ordem);
        limite = parseInt(limite);
        pagina = parseInt(pagina)
        if(limite > 0 && pagina > 0){
            const resultado = req.resultado;
            const resultadoPaginado = await resultado
            .sort({ [campoOrdenado]: ordem })
            .skip((pagina - 1) * limite)
            .limit(limite)
            .exec();
            res.status(200).json(resultadoPaginado);
        }else{
            next(new ErroBadRequest());
        }    
    } catch (erro) {
        next(erro);
    }
}

export default paginar;