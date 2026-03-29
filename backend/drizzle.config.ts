import { defineConfig } from "drizzle-kit"

export default defineConfig({
    schema:["./src/models/UserID.ts", "./src/models/UserUUID.ts", "./src/models/Grupos.ts", "./src/models/Rotas.ts",
        "./src/models/Rotas_Grupos.ts"
    ],
    out:"./drizzle",
    dialect:"postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL as string
    },
})