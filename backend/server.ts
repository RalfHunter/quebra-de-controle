import "dotenv"
import app from "./src/app.ts"
import http from "http"
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import DadosController from "./src/controllers/DadosController.ts"
const PORT = process.env.PORT || 3010




app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`)
})

const server = http.createServer(async (req, res) => {
    // Configuração global de cabeçalhos CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // Resposta imediata para a checagem do navegador (Preflight)
    if (req.method === "OPTIONS") {
        res.writeHead(204);
        return res.end();
    }

    try {
        const baseURL = `http://${req.headers.host}`;
        const myURL = new URL(req.url as string, baseURL);

        if (myURL.pathname.startsWith('/src/routes/')) {
            const nomeArquivo = path.basename(myURL.pathname);
            const caminhoArquivo = path.join(process.cwd(), 'src', 'routes', nomeArquivo);
            const conteudo = await fs.readFile(caminhoArquivo, 'utf-8');
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(conteudo);
        }

        const urlAlvo = myURL.searchParams.get("url");
        if (urlAlvo) {
            const respostaFetch = await fetch(urlAlvo);
            const data = await respostaFetch.json();
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify(data));
        }

        res.writeHead(404);
        res.end(JSON.stringify({ error: "Rota não encontrada" }));

    } catch (error: any) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
    }
}).listen(3011);