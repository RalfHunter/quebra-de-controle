import UserController from "../controllers/UserController.ts";
import { Router } from "express";

const router = Router()

const userController = new UserController()

router.get("/user", userController.listUserNotSecurity.bind(userController))
router.get("/user/:id", userController.listUserNotSecurity.bind(userController))

export default router