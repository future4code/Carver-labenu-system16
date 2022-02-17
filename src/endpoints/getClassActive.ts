import { Request, Response } from "express"
import { connection } from "../data/connection"
import { Turma } from "../types/class"

export const getClassActive = async (req: Request, res: Response) => {
    let errorCode = 400;
    try {
        const result :Turma[] = await connection('Turma')
        .select()
        .where('modulo', '>' ,'0')

        res.status(200).send(result)
    } catch (err: any) {
        res.status(errorCode).send({ message: err.message || err.sqlmessage })
    }
}