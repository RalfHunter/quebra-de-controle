import UserController from "../controllers/UserController.ts";
import { Router } from "express";

const router = Router()

const userController = new UserController()

router.get("/users", userController.listUserNotSecurity.bind(userController))
router.get("/users/:id", userController.listUserNotSecurity.bind(userController))

export default router