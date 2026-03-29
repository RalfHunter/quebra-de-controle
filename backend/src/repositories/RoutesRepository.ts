import db from "../../config/DbConfig.ts"
import { and, eq } from "drizzle-orm"
import { Grupo } from "../models/Grupos.ts"
import { Rota } from "../models/Rotas.ts"
import { Rotas_Grupos } from "../models/Rotas_Grupos.ts"

type CreateRoute = typeof Rota.$inferInsert
type CreateGroup = typeof Grupo.$inferInsert
type CreateRouteGroup = typeof Rotas_Grupos.$inferInsert

class RoutesRepository {
    async listRoutes(id?: string) {
        if (id) {
            const route = await db.select().from(Rota).where(eq(Rota.id, id))
            return route
        }

        const routes = await db.select().from(Rota)
        return routes
    }

    async createRoute(route: CreateRoute) {
        const created = await db.insert(Rota).values({ ...route }).returning()
        return created
    }

    async listGroups(id?: string) {
        if (id) {
            const group = await db.select().from(Grupo).where(eq(Grupo.id, id))
            return group
        }

        const groups = await db.select().from(Grupo)
        return groups
    }

    async createGroup(group: CreateGroup) {
        const created = await db.insert(Grupo).values({ ...group }).returning()
        return created
    }

    async listRoutesGroups(groupId?: string, routeId?: string) {
        if (groupId && routeId) {
            const permission = await db
                .select()
                .from(Rotas_Grupos)
                .where(and(eq(Rotas_Grupos.group_id, groupId), eq(Rotas_Grupos.route_id, routeId)))

            return permission
        }

        if (groupId) {
            const permissions = await db.select().from(Rotas_Grupos).where(eq(Rotas_Grupos.group_id, groupId))
            return permissions
        }

        if (routeId) {
            const permissions = await db.select().from(Rotas_Grupos).where(eq(Rotas_Grupos.route_id, routeId))
            return permissions
        }

        const permissions = await db.select().from(Rotas_Grupos)
        return permissions
    }

    async createRouteGroup(routeGroup: CreateRouteGroup) {
        const created = await db.insert(Rotas_Grupos).values({ ...routeGroup }).returning()
        return created
    }
}

export default RoutesRepository