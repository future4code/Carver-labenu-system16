import {Request, Response} from "express"
import { connection } from "../data/connection"

export const editProfessor = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const turma_id =  req.body
        const id = req.params.id

        await connection("Docente")
        .update(turma_id)
        .where( "id", id)
        
        res.status(200).send("Professor foi trocado de turma")
    } catch (err: any) {
        res.status(errorCode).send({ message: err.message || err.sqlmessage })
    }
}