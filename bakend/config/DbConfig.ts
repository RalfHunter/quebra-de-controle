import 'dotenv/config'
import { Pool } from 'pg'
import { drizzle } from "drizzle-orm/node-postgres"
import { UserID } from '../src/models/UserID.ts'
import { UserUUID } from '../src/models/UserUUID.ts'
import { sql } from 'drizzle-orm'

const URL = process.env.DATABASE_URL
console.log(URL)


const pool = new Pool({
    connectionString: URL
})

const db = drizzle(pool, {
    schema: {
        UserID,
        UserUUID
    }
})
export default db