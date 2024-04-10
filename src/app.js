import express from "express";
const app = express();
app.use(express.json());

const livros = [
    {
        id: 1,
        titulo: "O Senhor Dos Anéis"
    },
    {
        id: 2,
        titulo: "O Hobbit"
    }
]

function buscaLivroPorId(id){
    return livros.findIndex(livro => livro.id === Number(id));
}

app.get("/", (req, res) =>{
    res.status(200).send("Seja bem vindo à API! :D Tente ir para /livros, é bem legal.");
})

app.get("/livros", (req, res) =>{
    res.status(200).json(livros);
})

app.get("/livros/:id", (req, res) =>{
    const index = buscaLivroPorId(req.params.id);
    res.status(200).json(livros[index]);
})

app.post("/livros", (req, res) =>{
    livros.push(req.body);
    res.status(201).send("Livro criado!");
})

app.put("/livros/:id", (req, res) =>{
    const index = buscaLivroPorId(req.params.id);
    livros[index].titulo = req.body.titulo;
    res.status(200).json(livros);
})

app.delete("/livros/:id", (req, res) => {
    const index = buscaLivroPorId(req.params.id);
    livros.splice(index, 1);
    res.status(200).send("Livro Deletado Com Sucesso");
})

export default app;