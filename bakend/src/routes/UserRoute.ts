import UserController from "../controllers/UserController.ts";
import { Router } from "express";
import AuthMiddleware from "../middlewares/AuthMiddlware.ts";

const router = Router()

const userController = new UserController()

router.get("/users", AuthMiddleware, userController.listUserSecurity.bind(userController))

export default router