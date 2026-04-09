import express from "express"
import cors from "cors"
import router from "./routes/index.ts"
import helmet from 'helmet'

const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet())

app.use(router)

export default app