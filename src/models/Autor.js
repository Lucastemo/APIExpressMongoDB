import mongoose from "mongoose";

const autorSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    nome: {
        type: String,
        required: [true, "O Nome do Autor é Obrigatório"]
    },
    nacionalidade: {
        type: String,
        required: [true, "A Nacionalidade é Obrigatória"]
    }
}, { versionKey: false });

const autor = mongoose.model("autores", autorSchema);

export default autor;