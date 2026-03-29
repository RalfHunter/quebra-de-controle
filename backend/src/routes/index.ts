import auth from "./AuthRoute.ts"
import users from "./UserRoute.ts"
import { Router } from "express"

const router = Router()

router.use("/security", [auth, users])
// router.use("/not-security")
export default router