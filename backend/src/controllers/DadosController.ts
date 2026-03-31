import type { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response.ts";
import { urlSchema } from "../utils/validatores/schemas/zod/GetSchema.ts";
import 'dotenv'
import { AppError } from "../utils/appError.ts";

function parseEnvList(value?: string): string[] {
    if (!value) return [];
    return value
        .split(',')
        .map(item => item.trim())
        .filter(item => item !== '' && item !== undefined);
}

const ALLOWED_HOSTS = parseEnvList(process.env.ALLOWED_HOSTS)
const ALLOWED_PROTOCOLS = parseEnvList(process.env.ALLOWED_PROTOCOLS)

class DadosController {
    async getSeguro(req: Request, res: Response) {
        try {
            const url = req.query
            const parsedUrl = urlSchema.safeParse(url)
            if (!parsedUrl.success) {
                return res.status(400).json(errorResponse(parsedUrl.error.issues.map(e => e.message).join(", "), 400))
            }

            if (ALLOWED_PROTOCOLS.length === 0 || ALLOWED_HOSTS.length === 0) {
                throw new AppError(`Variáveis não setadas no .env para ALLOWED_PROTOCOLS ou ALLOWED_HOSTS`, 500)
            }


            if (!ALLOWED_PROTOCOLS.some(item => parsedUrl.data.url.startsWith(item))) {
                throw new AppError(`Protocolo não suportado`, 400)
            }

            if (!ALLOWED_HOSTS.some(item => parsedUrl.data.url.includes(item))) {
                throw new AppError(`Host não suportado`, 400)
            }


            
            const dados = await fetch(parsedUrl.data.url, { headers: { "Accept": "application/vnd.github+json" } })
            const data = await dados.json()
            res.status(200).json(successResponse(data))

        } catch (error: any) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json(errorResponse(error.message, error.statusCode))
            }
            console.log(error)
            res.status(500).json(errorResponse(`Erro interno no servidor`, 500))
        }
    }
}

export default DadosController