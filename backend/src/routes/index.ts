import auth from "./AuthSecurityRoute.ts"
import authNot from "./AuthNotSecurityRoute.ts"
import users from "./UserRoute.ts"
import dados from "./DadosSecurity.ts"
import dadosNot from "./DadosNotSercurity.ts"
import { Router } from "express"

const router = Router()

router.use("/security", [auth, users, dados])

router.use("/not-security", [authNot, dadosNot])
// router.use("/not-security")
export default router