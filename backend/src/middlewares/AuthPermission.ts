import type { NextFunction, Request, Response } from "express"
import { errorResponse } from "../utils/response.ts"
import PermissionService from "../services/PermitionService.ts"
import { AppError } from "../utils/appError.ts"

export default async function AuthPermission(req: Request, res: Response, next: NextFunction) {
   try {

      const fullUrl = req.originalUrl
      console.log(fullUrl)

      const autorizado = await PermissionService(req, res)
      if (!autorizado) {
         throw new AppError(`Não autorizado`, 401)
      }

      next()
   } catch (error: any) {
      if(error instanceof AppError) {
         return res.status(error.statusCode).json(errorResponse(error.message))
      }
      return res.status(500).json(errorResponse('Erro interno no servidor', 500))
   }
}