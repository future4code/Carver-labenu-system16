import { Request, Response } from "express"
import { connection } from "../../data/connection"

export const editStudent = async (req: Request, res: Response): Promise<void> => {
    let errorCode = 400
    try {
        const turma_id = req.body.turma_id
        const id = req.params.id

        if (!turma_id) {
            errorCode = 422
            throw new Error('Parâmetro ausente, preencha o campo necessário.')
        }

        const [checkId] = await connection('Estudante')
            .where('id', id)

        if (!checkId) {
            errorCode = 404
            throw new Error('Id inválido, estudante não encontrado.')
        }

        const [checkClass] = await connection('Turma')
            .where('id', turma_id)

        if (!checkClass) {
            errorCode = 404
            throw new Error('Id inválido, turma não encontrada.')
        }

        await connection("Estudante")
            .update({
                turma_id: turma_id
            })
            .where("id", "=", id)

        res.status(200).send("O estudante foi trocado de turma.")
    } catch (err: any) {
        res.status(errorCode).send({ message: err.message || err.sqlmessage })
    }
}