import { Request, Response } from "express"
import { connection } from "../../data/connection"


export const getStudentByName = async (req: Request, res: Response): Promise<void> => {
    let errorCode = 400
    try {
        const name = req.query.name

        const [result] = await connection('Estudante')
            .where('nome', 'like', `%${name}%`)

        if (!result) {
            errorCode = 404
            throw new Error("Estudante não encontrado, digite um valor válido.")
        }

        res.status(200).send({ result: result })

    } catch (err: any) {
        res.status(errorCode).send({ message: err.message || err.sqlmessage })
    }
}