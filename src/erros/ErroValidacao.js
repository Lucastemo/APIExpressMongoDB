import ErroBadRequest from "./ErroBadRequest.js";

class ErroValidacao extends ErroBadRequest{
    constructor(erro){
        const errosOcorridos = Object.values(erro.errors).map(erro => erro.message).join("; ");
        super(`Ocorreram os seguintes erros: ${errosOcorridos}`);
    }
}

export default ErroValidacao;