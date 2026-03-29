import UserController from "../controllers/UserController.ts";
import { Router } from "express";
import AuthMiddleware from "../middlewares/AuthMiddlware.ts";
import AuthPermission from "../middlewares/AuthPermission.ts";

const router = Router()

const userController = new UserController()

router.get("/users", AuthMiddleware, AuthPermission,userController.listUserSecurity.bind(userController))
router.get("/users/:id", AuthMiddleware, AuthPermission, userController.listUserSecurity.bind(userController))

export default router