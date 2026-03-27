import "dotenv"
import app from "./src/app.ts"

const PORT = process.env.PORT || 3010

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`)
})