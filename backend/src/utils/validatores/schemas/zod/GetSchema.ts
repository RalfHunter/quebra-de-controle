import {z} from "zod"

export const urlSchema = z.object({
    url:z.url({error:"Não é uma url válida."})
})