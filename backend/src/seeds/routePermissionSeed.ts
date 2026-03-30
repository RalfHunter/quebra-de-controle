import { and, eq, inArray } from "drizzle-orm"
import db from "../../config/DbConfig.ts"
import { Grupo } from "../models/Grupos.ts"
import { Rota } from "../models/Rotas.ts"
import { Rotas_Grupos } from "../models/Rotas_Grupos.ts"

const groupsToCreate = [
  { name: "admin", description: "Acesso administrativo" },
  { name: "basic", description: "Acesso basico" }
]

const routesToCreate = [
  {
    name: "Listar usuarios (sem id)",
    method: "GET",
    route_path: "/security/users",
    resource: "users"
  },
  {
    name: "Listar usuarios por id",
    method: "GET",
    route_path: "/security/users/:id",
    resource: "users"
  },
  {
    name:"Obter informações do usuário",
    method:"GET",
    route_path:"/security/me",
    resource:"perfil"
  }
]

async function seedRoutePermissions() {
  await db.insert(Grupo).values(groupsToCreate).onConflictDoNothing()
  await db.insert(Rota).values(routesToCreate).onConflictDoNothing()

  const groups = await db
    .select({ id: Grupo.id, name: Grupo.name })
    .from(Grupo)
    .where(inArray(Grupo.name, ["admin", "basic"]))

  const routes = await db
    .select({ id: Rota.id, route_path: Rota.route_path })
    .from(Rota)
    .where(and(eq(Rota.method, "GET"), inArray(Rota.route_path, ["/security/users", "/security/users/:id"])))

  const admin = groups.find((group) => group.name === "admin")
  const basic = groups.find((group) => group.name === "basic")
  const usersWithoutId = routes.find((route) => route.route_path === "/security/users")
  const usersWithId = routes.find((route) => route.route_path === "/security/users/:id")

  if (!admin || !basic || !usersWithoutId || !usersWithId) {
    throw new Error("Nao foi possivel localizar grupos/rotas para vincular permissoes")
  }

  await db
    .insert(Rotas_Grupos)
    .values([
      { group_id: admin.id, route_id: usersWithoutId.id },
      { group_id: admin.id, route_id: usersWithId.id },
      { group_id: basic.id, route_id: usersWithId.id }
    ])
    .onConflictDoNothing()

  console.log("Seed finalizada: permissoes de rotas para admin/basic criadas")
}

seedRoutePermissions()
  .catch((error) => {
    console.error("Erro ao executar seed de permissoes de rota:", error)
    process.exit(1)
  })
  .finally(() => {
    process.exit(0)
  })
