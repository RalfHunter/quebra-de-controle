import AuthController from "../controllers/AuthController.ts";
import AuthMiddleware from "../middlewares/AuthMiddleware.ts";
import { Router } from "express";

const router = Router()

const authController = new AuthController()

router.post("/login", authController.loginSecurity.bind(authController))
router.get("/me", AuthMiddleware, authController.meSecurity.bind(authController))

export default router