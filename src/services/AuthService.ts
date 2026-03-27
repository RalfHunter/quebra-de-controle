import type { TypeLogin } from "../utils/validatores/schemas/zod/AuthSchema.ts"
import bcrypt from "bcrypt"
import UserRepository from "../repositories/UserRepository.ts"
import { AppError } from "../utils/appError.ts"

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

        const senha = bcrypt.compare(login.password, data.password)
        if(!senha) {
            throw new AppError(`Email ou senha incorretos`, 404)
        }
    }
}

export default AuthService