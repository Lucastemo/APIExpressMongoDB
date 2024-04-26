import mongoose, { Mongoose } from "mongoose";
import { autorSchema } from "./Autor.js";

const livroSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { type: String, required: [true, "O Título do Livro é Obrigatório"] },
    editora: { type: String },
    preco: { type: Number },
    paginas: { type: Number },
    autor: { type: mongoose.Schema.Types.ObjectId, ref: "autores", required: [true, "O(a) Autor(a) do Livro é Obrigatório(a)"]}
}, { versionKey: false });

const livro = mongoose.model("livros", livroSchema);

export default livro;