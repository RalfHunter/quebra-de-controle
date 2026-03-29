import type { Request, Response } from "express";
import { Login } from "../utils/validatores/schemas/zod/AuthSchema.ts";
import { errorResponse, successResponse } from "../utils/response.ts";
import AuthService from "../services/AuthService.ts";
import { AppError } from "../utils/appError.ts";
class AuthController {
    private authService:AuthService

    constructor() {
        this.authService = new AuthService()
    }

    async loginSecurity(req:Request, res:Response) {
        
        try {

            const body = req.body

            const parsedData = Login.safeParse(body)

            if(!parsedData.success) {
                return res.status(400).json(errorResponse(parsedData.error.issues.map(e => e.message).join(", "), 400))
            }

            const data = await this.authService.login(parsedData.data)

            res.status(200).json(successResponse(data))

        } catch (error:any) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json(errorResponse(error.message, error.statusCode))
            }
            console.log(error)
            res.status(500).json(errorResponse('Erro interno no servidor', 500))
        }

    }

    async loginNotSecurity(req:Request, res:Response) {

    }
}

export default AuthController