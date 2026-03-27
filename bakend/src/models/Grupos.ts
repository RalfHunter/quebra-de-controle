import { pgTable, text, timestamp, uuid, } from "drizzle-orm/pg-core";

export const Grupo = pgTable("grupos", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull().notNull().unique(),
    description: text("description"),
    created_at: timestamp('birth_year', { mode: 'date', withTimezone: true }).notNull().defaultNow()
})