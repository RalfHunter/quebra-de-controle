import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";

export const UserID = pgTable("UsersID", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    password: text("password").notNull(),
    phone: text("phone").notNull(),
    cpf: text("text").notNull(),
    sex: text("sex").notNull(),
    birth_date: timestamp('birth_year', {mode: 'date', withTimezone: true}).notNull(),
    role: text("role").default("basic")
})