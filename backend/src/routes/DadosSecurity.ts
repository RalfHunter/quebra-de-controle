import DadosController from "../controllers/DadosController.ts";
import { Router } from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware.ts";


const router = Router()
const dadosController = new DadosController ()

router.get('/dados', AuthMiddleware, dadosController.getSeguro.bind(dadosController))

export default router