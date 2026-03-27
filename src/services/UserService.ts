import UserRepository from "../repositories/UserRepository.ts";
import type { TypeUser, TypeUserUpdate } from "../utils/validatores/schemas/zod/UserSchema.ts";

class UserService {
    private userRepository: UserRepository
    constructor() {
        this.userRepository = new UserRepository()
    }

    async listUserSecurity(id?: string) {
        
        const resultado = await this.userRepository.listUserSecurity(id)

        return resultado
    }

    async listUserNotSecurity(id?:number) {

        const resultado = await this.userRepository.listUserNotSecurity(id)

        return resultado
    }

    async createUserSecurity(user:TypeUser) {

        const data = await this.userRepository.createUserSecurity(user)

        return data
    }

    async createUserNotSecurity(user:TypeUser) {

        const data = await this.userRepository.createNotUserSecurity(user)

        return data
    }

    async updateUserSecurity(user:TypeUserUpdate, id:string) {
        const data = await this.userRepository.updateUserSecurity(user, id)

        return data
    }

    async updateUserNotSecurity(user:TypeUserUpdate, id:number) {
        const data = await this.userRepository.updateUserNotSecurity(user, id)

        return data
    }

    async deleteUserSecurity(id:string) {
        const data = await this.userRepository.deleteUserSecurity(id)

        return data
    }

    async deleteUserNotSecurity(id:number) {
        const data = await this.userRepository.deleteUserNotSecurity(id)

        return data
    }
}

export default UserService