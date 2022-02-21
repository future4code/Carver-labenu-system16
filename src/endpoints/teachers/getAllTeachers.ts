import { Request, Response } from "express"
import { connection } from "../../data/connection"
import { docente } from "../../types/types"


export const getAllTeachers = async (req: Request, res: Response): Promise<void> => {
    let errorCode = 400
    try {
        const result: docente[] = await connection('Docente')
            .select()

        res.status(200).send({ result: result })
    } catch (err: any) {
        res.status(errorCode).send({ message: err.message || err.sqlmessage })
    }
}