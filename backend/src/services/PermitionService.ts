import type { Request, Response } from "express"
import db from "../../config/DbConfig.ts"
import { UserUUID } from "../models/UserUUID.ts"
import { eq, or, type SQLWrapper } from "drizzle-orm"
import { Grupo } from "../models/Grupos.ts"
import { Rotas_Grupos } from "../models/Rotas_Grupos.ts"
import { Rota } from "../models/Rotas.ts"

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

async function PermissionService(req: Request, res: Response,) {
    try {

        const fullPath = req.baseUrl + req.path
        const rotaQuebrada = fullPath.split('/').filter(item => item != '')

        const user = await db.select({ id: UserUUID.id, role: UserUUID.role }).from(UserUUID).where(eq(UserUUID.id, req.user_id as string))

        if (user.length == 0) {
            return false
        }
        const grupo = await db.select({ id: Grupo.id }).from(Grupo).where(eq(Grupo.name, user[0]?.role as string))

        const grupo_rotas = await db.select().from(Rotas_Grupos).where(eq(Rotas_Grupos.group_id, grupo[0]?.id as string))

        const consulta: SQLWrapper[] = []

        grupo_rotas.forEach(item => {
            consulta.push(eq(Rota.id, item.route_id as string))
        })

        let autorizado = false

        const rotas = await db.select({ metodo: Rota.method, url: Rota.route_path }).from(Rota).where(or(...consulta))
        // console.log(rotas)
        for (const rota of rotas) {
            const rotaBanco = rota.url.split('/').filter(item => item != '')
            if(req.method.toLowerCase() !== rota.metodo.toLocaleLowerCase()) {
                
                continue
            }
            for(let i:number =0; i < rotaBanco.length; i++) {
                
              
                if(rotaQuebrada[i] === rotaBanco[i] || (rotaBanco[i] === ":id" && rotaQuebrada[i]?.match(uuid))) {
                    autorizado = true
                } else {
                    autorizado = false
                }
            }
            if(autorizado) {
                break
            }

        }
        return autorizado
    } catch (error: any) {
        console.log(error)
        return false
    }
}

export default PermissionService