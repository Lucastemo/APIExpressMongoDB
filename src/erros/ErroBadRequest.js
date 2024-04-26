import ErroBase from "./ErroBase.js";

class ErroBadRequest extends ErroBase{
    constructor(mensagem = "Um ou mais dados foram fornecidos incorretamente"){
        super(mensagem, 400);
    }
}

export default ErroBadRequest;