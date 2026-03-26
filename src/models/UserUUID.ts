
import { date, pgTable, PgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";

export const UserUUID = pgTable("UsersUUID", {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    password: text("password").notNull(),
    phone: text("phone").notNull(),
    cpf: text("text").notNull(),
    sex: text("sex").notNull(),
    birth_year: timestamp('birth_year', {mode: 'date', withTimezone: true}).notNull()
})