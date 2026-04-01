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
    try {
        const baseURL = `http://${req.headers.host}`;
        const myURL = new URL(req.url as string, baseURL);

        // ROTA 1: Se a URL começar com /routes/, lemos o arquivo do disco
        if (myURL.pathname.startsWith('/src/routes/')) {
            const nomeArquivo = path.basename(myURL.pathname);
            
            // Ajustado para entrar em 'src/routes/' conforme sua estrutura
            const caminhoArquivo = path.join(process.cwd(), 'src', 'routes', nomeArquivo);
            
            console.log("Tentando ler arquivo em:", caminhoArquivo);

            const conteudo = await fs.readFile(caminhoArquivo, 'utf-8');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(conteudo);
        }

        // ROTA 2: O Proxy (sua lógica original corrigida)
        const urlAlvo = myURL.searchParams.get("url");
        if (urlAlvo) {
            const respostaFetch = await fetch(urlAlvo);
            const data = await respostaFetch.json(); // Extraímos os dados aqui
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify(data)); // Enviamos 'data', não 'respostaFetch'
        }

        res.writeHead(404);
        res.end("Rota não encontrada");

    } catch (error: any) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
    }
}).listen(3011);