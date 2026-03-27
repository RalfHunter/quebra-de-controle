
import { UserID } from "../models/UserID.ts";

import db from "../../config/DbConfig.ts";
import type { TypeUser, TypeUserID, TypeUserUpdate, TypeUserUUID } from "../utils/validatores/schemas/zod/UserSchema.ts";
import { UserUUID } from "../models/UserUUID.ts";
import { eq } from "drizzle-orm";

class UserRepository {

  async listUserSecurity(id?:string){
    if(id) {
      const consulta = await db.select().from(UserUUID).where(eq(UserUUID.id, id))
      return consulta
    }

    const consulta = await db.select().from(UserUUID)
    return consulta
  }


  async listUserNotSecurity(id?:number) {
    if(id) {
      const consulta = await db.select().from(UserID).where(eq(UserID.id, id))
      return consulta
    }

    const consulta = await db.select().from(UserID)

    return consulta
  }

  async createUserSecurity(User: TypeUser) {
    const user = await db.insert(UserUUID).values({ ...User })

    return user
  }

  async createNotUserSecurity(User: TypeUser) {

    const user = await db.insert(UserID).values({ ...User })

    return user
  }

  async updateUserSecurity(user:TypeUserUpdate, id:string) {

    const updated = await db.update(UserUUID).set({...user}).where(eq(UserUUID.id, id)).returning()

    return updated
  }

  async updateUserNotSecurity(user:TypeUserUpdate, id:number) {

    const updated = await db.update(UserID).set({...user}).where(eq(UserID.id, id)).returning()

    return updated

  }

  async deleteUserSecurity(id:string) {

    const deleted = await db.delete(UserUUID).where(eq(UserUUID.id, id)).returning()

    return deleted
  }

  async deleteUserNotSecurity(id:number) {
    
    const deleted = await db.delete(UserID).where(eq(UserID.id, id)).returning()

    return deleted
  }


}

export default UserRepository