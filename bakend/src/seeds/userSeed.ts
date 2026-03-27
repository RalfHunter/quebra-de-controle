import bcrypt from "bcrypt"
import { cpf } from "cpf-cnpj-validator"
import parsePhoneNumberFromString from "libphonenumber-js"
import { inArray } from "drizzle-orm"
import db from "../../config/DbConfig.ts"
import { UserID } from "../models/UserID.ts"
import { UserUUID } from "../models/UserUUID.ts"

type BaseUser = {
  name: string
  email: string
  sex: "male" | "female",
  role?: string
}

const baseUsers: BaseUser[] = [
  { name: "Administrador", email: "admin@gmail.com", sex: "male", role:"admin" },
  { name: "Amanda", email: "amanda@gmail.com", sex: "female" },
  { name: "Bruno", email: "bruno@gmail.com", sex: "male" },
  { name: "Carlos", email: "carlos@gmail.com", sex: "male" }
]

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateBrazilianPhone() {
  while (true) {
    const ddd = randomInt(11, 99)
    const subscriber = `${randomInt(1000, 9999)}${randomInt(1000, 9999)}`
    const candidate = `+55${ddd}9${subscriber}`

    const phone = parsePhoneNumberFromString(candidate, "BR")
    if (phone?.isValid()) {
      return phone.number
    }
  }
}

async function seedUsers() {
  const hashedPassword = await bcrypt.hash("Senh@123", 10)
  const birthDate = new Date("2000-01-01T00:00:00.000Z")

  const users = baseUsers.map((user) => ({
    ...user,
    password: hashedPassword,
    birth_date: birthDate,
    cpf: cpf.generate(),
    phone: generateBrazilianPhone()
  }))

  const emails = users.map((user) => user.email)

  await db.delete(UserID).where(inArray(UserID.email, emails))
  await db.delete(UserUUID).where(inArray(UserUUID.email, emails))

  await db.insert(UserID).values(users)
  await db.insert(UserUUID).values(users)

  console.log("Seed finalizada: 4 usuarios inseridos em UsersID e UsersUUID")
}

seedUsers()
  .catch((error) => {
    console.error("Erro ao executar seed de usuarios:", error)
    process.exit(1)
  })
  .finally(() => {
    process.exit(0)
  })
