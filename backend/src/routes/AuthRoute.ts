import AuthController from "../controllers/AuthController.ts";
import { Router } from "express";

const router = Router()

const authController = new AuthController()

router.post("/login", authController.loginSecurity.bind(authController))

export default router