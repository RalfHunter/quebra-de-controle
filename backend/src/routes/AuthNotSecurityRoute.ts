import AuthController from "../controllers/AuthController.ts";
import { Router } from "express";
import AuthMiddlewareNotSecurity from "../middlewares/AuthMiddlewareNotSecurity.ts";
const router = Router()

const authController = new AuthController()

router.post("/login", authController.loginNotSecurity.bind(authController))
router.get("/me", AuthMiddlewareNotSecurity, authController.meNotSecurity.bind(authController))

export default router