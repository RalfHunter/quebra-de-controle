import { z } from "zod"
import { cpf } from "cpf-cnpj-validator";
import parsePhoneNumberFromString from "libphonenumber-js";

const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;

export const UserSchemaUUID = z.object({
    id: z.uuid({error:"ID inválido"}).optional(),
    sex: z.enum(["male", "female"], {error:"Sexo inválido, somente male e female são permitidos"}),
    email: z.email({ error: "Email não é válido" }),
    password: z.string({error:"A senha não é uma string válida"})
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .regex(/[A-Z]/, "Deve conter ao menos uma letra maiúscula").regex(/[0-9]/, "Deve conter ao menos um número")
    .regex(/[^a-zA-Z0-9]/, "Deve conter ao menos um caractere especial"),
    name: z.string({ error: "O nome é obrigatório" }).min(2, { error: "Nome é muito curto." }).regex(nameRegex, "O nome não pode conter números ou caracteres especiais"),
    cpf: z.preprocess(arg => {
        if (typeof arg === "string") {
            const val = cpf.isValid(arg)
            if (val) {
                return arg
            } else {
                return undefined
            }
        }
        return undefined
    }, z.string({error:"O CPF não é válido."})),
    birth_date: z.coerce.date({error:"A data de nascimento não é válida"}),
    phone: z.preprocess(arg => {
        if(typeof arg === "string") {
            let val = parsePhoneNumberFromString(arg, 'BR')
            if(val?.isValid){
                return arg
            } else {
                return undefined
            }
        }
        return undefined
    }, z.string({error:"Numero te telefono inválido"}))
})

export const UserSchemaID = UserSchemaUUID.extend({id: z.coerce.number({error:"ID não é um número válido"}).int({error:"ID dev ser um número inteiro."}).positive({error:"ID deve ser um numero positivo."}).optional()})

export const User = UserSchemaUUID.omit({id:true})

export const UserUpdate = User.pick({phone:true})

export const UserUpdateUUIDParam = UserSchemaID.pick({id:true}).extend({id: z.uuid({error:"ID inválido"})})

export const UserUpdateIDParam = UserSchemaID.pick({id:true}).extend({id: z.coerce.number({error:"ID não é um número válido"}).int({error:"ID dev ser um número inteiro."}).positive({error:"ID deve ser um numero positivo."})})


export const UserSchemaUUIDString = z.uuid({error:"ID inválido"})
export type TypeUserUpdate = z.infer<typeof UserUpdate>
export type TypeUserUUID  = z.infer<typeof UserSchemaUUID>
export type TypeUserID = z.infer<typeof UserSchemaID>
export type TypeUser = z.infer<typeof User>