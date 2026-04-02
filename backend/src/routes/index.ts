import auth from "./AuthSecurityRoute.ts"
import authNot from "./AuthNotSecurityRoute.ts"
import users from "./UserRoute.ts"
import usersNot from "./UserNotSecurityRoute.ts"
import dados from "./DadosSecurity.ts"
import dadosNot from "./DadosNotSercurity.ts"
import { Router } from "express"

const router = Router()

router.use("/security", [auth, users, dados])

router.use("/not-security", [authNot, dadosNot, usersNot])
// router.use("/not-security")
export default router