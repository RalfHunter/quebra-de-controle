import type { PgTableWithColumns } from "drizzle-orm/pg-core";
import { UserID } from "../models/UserID.ts";
import { UserUUID } from "../models/UserUUID.ts";
import db from "../../config/DbConfig.ts";

class UserRepository {
  private modelSecurity:PgTableWithColumns<any>
  constructor(){
  this.modelSecurity = UserID
  }
async createUserSecurity () {
  const user = await db.insert(UserID).values()
}
}

export default UserRepository