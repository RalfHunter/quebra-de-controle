import { pgTable, text, timestamp, uuid, unique } from "drizzle-orm/pg-core";

export const Rota = pgTable("rotas", {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    method: text('method').notNull(),
    route_path: text('route_path').notNull(),
    resource: text('resource').notNull(),
    created_at: timestamp('birth_year', { mode: 'date', withTimezone: true }).notNull().defaultNow(),
},
(t) => [
    unique('method_path').on(t.method, t.route_path)
]
)