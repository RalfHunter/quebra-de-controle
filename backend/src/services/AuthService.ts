import type { TypeLogin } from "../utils/validatores/schemas/zod/AuthSchema.ts"
import bcrypt from "bcrypt"
import UserRepository from "../repositories/UserRepository.ts"
import { AppError } from "../utils/appError.ts"
import jwt from "jsonwebtoken"
import type { StringValue } from "ms"
import "dotenv"
const EXPIRES_ACCESS = process.env.EXPIRES_ACCESS as StringValue

class AuthService {

    private userRepository: UserRepository

    constructor() {
        this.userRepository = new UserRepository()
    }

    async login(login: TypeLogin) {

        const data = await this.userRepository.findForEmailAndPassword(login.email)
        if (!data) {
            throw new AppError(`Email ou senha incorretos`, 404)
        }

        const senha = await bcrypt.compare(login.password, data.password)
        if (!senha) {
            throw new AppError(`Email ou senha incorretos`, 404)
        }

        const token = await new Promise((resolve, reject) => {
            let Token: string | undefined 
            jwt.sign({ id: data.id as string }, process.env.ACCESS_TOKEN as string, { expiresIn: EXPIRES_ACCESS }, (err, token) => {
                if (err) {
                    throw new AppError(`Erro ao gerar token`, 500)
                }
                resolve(token)
            })

        })
        const body = {
            id: data.id,
            access_token: token
        }

        return body
    }
    async loginNotSecurity(login:TypeLogin) {
        const data = await this.userRepository.findForEmailAndPasswordNotSecurity(login.email)
        if (!data) {
            throw new AppError(`Email incorreto`, 404)
        }
        
        const senha = await bcrypt.compare(login.password, data.password)
        if (!senha) {
            throw new AppError(`Senha incorreta`, 404)
        }

        
        const header = {
            id: data.id,
        }

        return header


    }

    async meSecurity(id:string) {
    const data = await this.userRepository.meSecurity(id)

    return data
    }

   async meNotSecurity(id:number) {
    const data = await this.userRepository.meNotSecurity(id)
    
    if(!data) {
        throw new AppError(`Usuário não encontrado`, 404)
    }

    return data
    }
}

export default AuthService