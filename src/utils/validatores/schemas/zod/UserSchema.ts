import { z } from "zod"
import { cpf } from "cpf-cnpj-validator";
import parsePhoneNumberFromString from "libphonenumber-js";

const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;

export const UserSchema = z.object({
    user: z.string({ error: "Nome é obrigatório" }),
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