const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Armazenamento em memória dos comentários
let comentarios = [
    {
        id: 1,
        usuario: "WaveIGL",
        avatar: "https://avatars.akamai.steamstatic.com/54943af8f0f6eb25cc2b442e46c15926e28bda54_full.jpg",
        texto: "aaaaaaaaaaaaaaaaaah!!!!!!"
    }
];

// GET - Listar todos os comentários
app.get("/comentarios", (req, res) => {
    res.json(comentarios);
});

// POST - Adicionar novo comentário
app.post("/comentarios", (req, res) => {
    const { usuario, texto, avatar } = req.body;
    
    if (!usuario || !texto) {
        return res.status(400).json({ erro: "Usuario e texto são obrigatórios" });
    }
    
    const novoComentario = {
        id: comentarios.length + 1,
        usuario,
        avatar: avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(usuario),
        texto
    };
    
    comentarios.push(novoComentario);
    res.status(201).json(novoComentario);
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
