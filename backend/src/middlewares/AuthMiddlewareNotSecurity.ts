import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError.ts";
import { errorResponse } from "../utils/response.ts";


export default async function AuthMiddlewareNotSecurity(req:Request, res:Response, next:NextFunction) {
    try {

        const id = req.headers['x-user-id']
        // console.log(req.headers)
        if(!id) {
            throw new AppError(`Não autorizado`, 401)
        }
        req.user_id = Number(id)
    
        console.log(id)
        next()
    } catch (error:any) {
        if(error instanceof AppError) {
            return res.status(error.statusCode).json(errorResponse(error.message))
        }
        res.status(500).json(errorResponse(error.message, 500))
    }
}