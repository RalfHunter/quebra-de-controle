import auth from "./AuthSecurityRoute.ts"
import authNot from "./AuthNotSecurityRoute.ts"
import users from "./UserRoute.ts"
import { Router } from "express"

const router = Router()

router.use("/security", [auth, users])

router.use("/not-security", [authNot])
// router.use("/not-security")
export default router