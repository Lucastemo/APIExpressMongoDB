import mongoose, { Mongoose } from "mongoose";

const livroSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: {
        type: String, 
        required: [true, "O Título do Livro é Obrigatório"]
    },
    editora: {
        type: String,
        required: [true, "A Editora é Obrigatória"],
        enum: {
            values: ["Casa do Código", "Alura"],
            message: "A editora {VALUE} não é um valor permitido"
        }
    },
    preco: {
        type: Number,
        required: [true, "O Preço é Obrigatório"]
    },
    paginas: {
        type: Number,
        required: [true, "O Número de Páginas é Obrigatório"],
        min: [10, "O número mínimo de páginas é 10 (Valor passado: {VALUE})"],
        max: [5000, "O número máximo de páginas é 5000 (Valor passado: {VALUE})"]
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "autores",
        required: [true, "O(a) Autor(a) do Livro é Obrigatório(a)"]
    }
}, { versionKey: false });

const livro = mongoose.model("livros", livroSchema);

export default livro;