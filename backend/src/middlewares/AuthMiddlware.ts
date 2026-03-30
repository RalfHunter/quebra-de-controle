import type { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/response.ts";
import jwt from "jsonwebtoken"
import "dotenv"
import PermissionService from "../services/PermitionService.ts";

const ACCESS_TOKEN = process.env.ACCESS_TOKEN as string

/*
{
  id: 'a4c6b54f-eaf7-4b0e-87e0-0c9b57d20ebd',
  iat: 1774897788,
  exp: 1774901388
}
*/

interface TOKEN {
    id:string,
    iat:number,
    exp:number
}

export default async function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers['authorization']

        const token = authHeader?.split(' ')[1]

        if (!token) {
            return res.status(401).json(errorResponse(`Não autorizado.`))
        }

        const user:TOKEN = await new Promise((resolve, reject) => {
            jwt.verify(token, ACCESS_TOKEN, (err, user:any) => {
                if (err) {
                    console.log(err)
                    reject(err)
                    // res.status(403).json(errorResponse(`Token inválido`, 403))
                }
                resolve(user)

            })
        })
        if(user.id){
            req.user_id = user.id
        }

        
        next()
    } catch(error:any) {
        if(error instanceof jwt.TokenExpiredError) {
            return res.status(403).json(errorResponse(`Token vencido, faça login novamente`, 403))
        }
        if(error instanceof jwt.JsonWebTokenError) {
            return res.status(403).json(errorResponse(`Token com assinatura incorreta`, 403))
        }
        console.log("Chegou aqui")

        return res.status(500).json(errorResponse(`Erro interno no servidor`, 500))
    }


}