import { Request, Response } from "express"
import { connection } from "../data/connection"


export const getAllTeachers = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const result = await connection('Docente')
        .select()

        res.status(200).send({result: result})
    } catch (err: any) {
        res.status(errorCode).send({ message: err.message || err.sqlmessage })
    }
}