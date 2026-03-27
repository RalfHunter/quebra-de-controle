import { pgTable, text, timestamp, uuid, unique, primaryKey } from "drizzle-orm/pg-core";
import { Grupo } from "./Grupos.ts";
import { Rota } from "./Rotas.ts";

export const Rotas_Grupos = pgTable("rotas_grupos", {
    group_id: uuid("group_id").references(() =>Grupo.id,{onDelete: "cascade"}),
    route_id: uuid("rota_id").references(() => Rota.id, {onDelete:"cascade"})
},
(t) => [
    primaryKey({columns:[t.group_id, t.route_id]})
]
)