import type { Request, Response } from "express"

async function PermissionService(req: Request, res: Response) {
    try {

        const rotaQuebrada = req.originalUrl.split('/').filter(item => item != '') 

        console.log(rotaQuebrada)

        return rotaQuebrada

    } catch (error: any) {
        console.log(error)

    }
}
export default PermissionService