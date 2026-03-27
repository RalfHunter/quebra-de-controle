import {z} from "zod"

export const Login = z.object({
    email: z.email({error:"Email inválido"}),
    password: z.string({error:"A senha não é uma string válida"})
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .regex(/[A-Z]/, "Deve conter ao menos uma letra maiúscula").regex(/[0-9]/, "Deve conter ao menos um número")
    .regex(/[^a-zA-Z0-9]/, "Deve conter ao menos um caractere especial")
})

export type TypeLogin = z.infer<typeof Login>