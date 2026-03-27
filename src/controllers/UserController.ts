import type { Request, Response } from "express";
import UserService from "../services/UserService.ts";
import { User, UserSchemaID, UserSchemaUUID, UserUpdate, UserUpdateIDParam, UserUpdateUUIDParam } from "../utils/validatores/schemas/zod/UserSchema.ts";
import { errorResponse, successResponse } from "../utils/response.ts";
import { AppError } from "../utils/appError.ts";

class UserController {
    private userService: UserService
    constructor() {
        this.userService = new UserService()
    }

    async listUserSecurity(req: Request, res: Response) {

        try {
            const id = req.params.id
            const parsedId = UserSchemaUUID.pick({ id: true }).safeParse(id)

            if (!parsedId.success) {
                return res.status(400).json(errorResponse(parsedId.error.issues.map(e => e.message).join(", "), 400))
            }
            const data = await this.userService.listUserSecurity(parsedId.data.id)

            return data
        }
        catch (error: any) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json(errorResponse(error.message, error.statusCode))
            }
            res.status(500).json(errorResponse('Erro interno no servidor', 500))
        }
    }

    async listUserNotSecurity(req: Request, res: Response) {
        try {

            const id = req.params.id
            const parsedId = UserSchemaID.pick({ id: true }).safeParse(id)

            if (!parsedId.success) {
                return res.status(400).json(errorResponse(parsedId.error.issues.map(e => e.message).join(", "), 400))
            }
            const data = await this.userService.listUserNotSecurity(parsedId.data.id)

            return data

        } catch (error: any) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json(errorResponse(error.message, error.statusCode))
            }
            res.status(500).json(errorResponse('Erro interno no servidor', 500))

        }
    }

    async createUserSecurity(req: Request, res: Response) {
        try {

            const body = req.body
            const parsedData = User.safeParse(body)

            if (!parsedData.success) {
                return res.status(400).json(errorResponse(parsedData.error.issues.map(e => e.message).join(", "), 400))
            }

            const data = await this.userService.createUserSecurity(parsedData.data)

            res.status(201).json(successResponse(data))

        } catch (error: any) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json(errorResponse(error.message, error.statusCode))
            }
            res.status(500).json(errorResponse('Erro interno no servidor', 500))
        }
    }

    async createUserNotSecurity(req: Request, res: Response) {
        try {

            const body = req.body
            const parsedData = User.safeParse(body)

            if (!parsedData.success) {
                return res.status(400).json(errorResponse(parsedData.error.issues.map(e => e.message).join(", "), 400))
            }

            const data = await this.userService.createUserNotSecurity(parsedData.data)

            res.status(201).json(successResponse(data))

        } catch (error: any) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json(errorResponse(error.message, error.statusCode))
            }
            res.status(500).json(errorResponse('Erro interno no servidor', 500))
        }
    }

    async updateSecurity(req: Request, res: Response) {
        try {
            const body = req.body

            const id = req.params.id

            const parsedId = UserUpdateUUIDParam.safeParse(id)

            if (!parsedId.success) {
                return res.status(400).json(errorResponse(parsedId.error.issues.map(e => e.message).join(", "), 400))
            }

            const parsedData = UserUpdate.safeParse(body)

            if (!parsedData.success) {
                return res.status(400).json(errorResponse(parsedData.error.issues.map(e => e.message).join(", "), 400))
            }

            const data = await this.userService.updateUserSecurity(parsedData.data, parsedId.data.id)

            return data
        } catch (error: any) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json(errorResponse(error.message, error.statusCode))
            }
            res.status(500).json(errorResponse('Erro interno no servidor', 500))
        }
    }

    async updateNotSecurity(req: Request, res: Response) {
        try {

            const body = req.body

            const id = req.params.id

            const parsedId = UserUpdateIDParam.safeParse(id)

            const parsedData = UserUpdate.safeParse(body)

            if (!parsedId.success) {
                return res.status(400).json(errorResponse(parsedId.error.issues.map(e => e.message).join(", "), 400))
            }

            if (!parsedData.success) {
                return res.status(400).json(errorResponse(parsedData.error.issues.map(e => e.message).join(", "), 400))
            }

            const data = await this.userService.updateUserNotSecurity(parsedData.data, parsedId.data.id)

            res.status(200).json(successResponse(data))

        } catch (error: any) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json(errorResponse(error.message, error.statusCode))
            }
            res.status(500).json(errorResponse('Erro interno no servidor', 500))
        }
    }

    async deleteSecurity(req: Request, res: Response) {
        try {

            const id = req.params.id

            const parsedId = UserUpdateUUIDParam.safeParse(id)

            if (!parsedId.success) {
                return res.status(400).json(errorResponse(parsedId.error.issues.map(e => e.message).join(", "), 400))
            }

            const data = await this.userService.deleteUserSecurity(parsedId.data.id)

            res.status(200).json(successResponse(data))

        } catch (error: any) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json(errorResponse(error.message, error.statusCode))
            }
            res.status(500).json(errorResponse('Erro interno no servidor', 500))
        }
    }

    async deleteNotSecurity(req: Request, res: Response) {
        try {

            const id = req.params.id

            const parsedId = UserUpdateIDParam.safeParse(id)

            if (!parsedId.success) {
                return res.status(400).json(errorResponse(parsedId.error.issues.map(e => e.message).join(", "), 400))
            }

            const data = await this.userService.deleteUserNotSecurity(parsedId.data.id)

            res.status(200).json(successResponse(data))
        } catch (error: any) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json(errorResponse(error.message, error.statusCode))
            }
            res.status(500).json(errorResponse('Erro interno no servidor', 500))
        }
    }
}
