import type { NextFunction, Request, Response } from "express"
import { errorResponse } from "../utils/response.ts"
import PermissionService from "../services/PermitionService.ts"

export default async function AuthPermission(req:Request, res:Response, next:NextFunction){
 try{

    const fullUrl = req.originalUrl
    console.log(fullUrl)
    
    await PermissionService(req, res)
    next()
 }catch(error:any) {

    return res.status(500).json(errorResponse('Erro interno no servidor', 500))
 }
}