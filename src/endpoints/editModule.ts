import {Request, Response} from "express"
import { connection } from "../data/connection"

export const editModule = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const id = req.params.id
        const modulo  = req.body.modulo

        await connection('Turma')
        .update({
            modulo: modulo
        })
        .where('id', id)

        res.status(200).send({message: 'Módulo alterado!'})
        
    } catch (err: any) {
        res.status(errorCode).send({ message: err.message || err.sqlmessage })
    }

}